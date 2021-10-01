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


class TaskConfig(AppConfig):
    """Define Task App Config"""

    default_auto_field = "django.db.models.BigAutoField"
    name = "task"
