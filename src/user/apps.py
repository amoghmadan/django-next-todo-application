####################
# Standard Imports #
####################

########################
# Non-Standard Imports #
########################
from django.apps import AppConfig

#########################
# Project Level Imports #
#########################


class UserConfig(AppConfig):
    """Define User App Config"""

    default_auto_field = "django.db.models.BigAutoField"
    name = "user"
