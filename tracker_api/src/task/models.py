from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy


class Item(models.Model):
    """Item Model"""

    class Status(models.IntegerChoices):
        """Item Status Choices"""

        TODO = 0, gettext_lazy("Todo")
        WIP = 1, gettext_lazy("Work In Progress")
        DONE = 2, gettext_lazy("Done")

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name=gettext_lazy("items"),
        verbose_name=gettext_lazy("user"),
    )
    text = models.CharField(gettext_lazy("text"), max_length=255)
    status = models.SmallIntegerField(
        gettext_lazy("status"),
        choices=Status.choices,
        db_index=True,
        default=Status.TODO,
    )
    created = models.DateTimeField(gettext_lazy("created"), auto_now_add=True)
    updated = models.DateTimeField(gettext_lazy("updated"), auto_now=True)

    class Meta:
        verbose_name = gettext_lazy("item")
        verbose_name_plural = gettext_lazy("items")
