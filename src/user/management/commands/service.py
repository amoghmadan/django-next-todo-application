####################
# Standard Imports #
####################
from importlib import import_module
from pathlib import Path
from platform import system
from subprocess import run  # nosec
from sys import executable

########################
# Non-Standard Imports #
########################
from django.conf import settings
from django.core.management import BaseCommand

#########################
# Project Level Imports #
#########################

WINDOWS_CMD = """
:: Install Service
nssm install {title} "{executable}"

:: Application Setup
nssm set {title} AppDirectory "{base_dir}"
nssm set {title} AppParameters "--listen {host}:{port} {wsgi}"

:: Details Setup
nssm set {title} DisplayName "{upper}"
nssm set {title} Description "{description}"
nssm set {title} Start SERVICE_AUTO_START

:: Environment Setup
nssm set {title} AppEnvironmentExtra {envvar}={env}
"""

LINUX_SERVICE = """
[Unit]
Description={upper} | {description}
After=network.target
Wants=network-online.target

[Service]
Restart=always
Type=simple
ExecStart={executable} -b {host}:{port} {wsgi} --access-log {access_log}
WorkingDirectory={base_dir}
User={user}
Environment={envvar}={env}
StandardInput=syslog
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier={identifier}

[Install]
WantedBy=multi-user.target
"""


class Command(BaseCommand):
    """Platform install wsgi server"""

    help = "Generate system file for deployment"

    # Generate Application Defaults
    system = system()
    name = settings.ROOT_URLCONF.replace(".urls", "")
    wsgi = ":".join((".".join((name, "wsgi")), "application"))
    service = {
        "Linux": {
            "content": LINUX_SERVICE,
            "install": "gunicorn",
            "executable": "gunicorn",
            "ext": "service",
        },
        "Windows": {
            "content": WINDOWS_CMD,
            "install": "waitress",
            "executable": "waitress-serve",
            "ext": "cmd",
        },
    }

    def add_arguments(self, parser):
        """Arguments to configure service files"""

        parser.add_argument(
            "-H",
            "--host",
            type=str,
            default="127.0.0.1",
            help="Host to run [default: 127.0.0.1]",
        )
        parser.add_argument(
            "-p",
            "--port",
            type=int,
            default=8000,
            help="Port to run [default: 8000]",
        )
        parser.add_argument(
            "-ev",
            "--envvar",
            type=str,
            default="DJANGO_SETTINGS_MODULE",
            help="Environment variable to run [default: DJANGO_SETTINGS_MODULE]",
        )
        parser.add_argument(
            "-e",
            "--env",
            type=str,
            default=self.name + ".settings",
            help="Environment to run [default: " + self.name + ".settings]",
        )
        parser.add_argument(
            "-d",
            "--description",
            type=str,
            default="Django Application",
            help="Description for application [default: Django Application]",
        )

    def handle(self, *args, **options):
        """Install specific server"""

        server = self.service[self.system]["executable"]
        package = self.service[self.system]["install"]
        ext = self.service[self.system]["ext"]
        options = {
            "title": self.name.capitalize(),
            "upper": self.name.upper(),
            "base_dir": settings.BASE_DIR,
            "executable": Path(executable).parent / server,
            "wsgi": self.wsgi,
            "access_log": settings.LOGS_DIR / "access.log",
            "user": Path.home().name,
            "identifier": self.name.lower(),
            **options,
        }

        try:
            import_module(package)
        except ModuleNotFoundError:
            run(["pip", "install", package])

        path = settings.BASE_DIR.parent / (self.name.lower() + "." + ext)
        content = self.service[self.system]["content"].strip()
        with path.open("w") as w:
            w.write(content.format(**options))
