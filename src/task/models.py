from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Item(models.Model):
    """Item Model"""

    class Status(models.IntegerChoices):
        """Status Choices"""

        TODO = 0, _("Todo")
        WIP = 1, _("Work in Progress")
        HOLD = 2, _("On Hold")
        DONE = 3, _("Done")
        SCRAP = 4, _("Scraped")

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    description = models.TextField()
    status = models.IntegerField(
        choices=Status.choices, default=Status.TODO, db_index=True
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        """Model Metadata"""

        verbose_name = _("Item")
        verbose_name_plural = _("Items")
