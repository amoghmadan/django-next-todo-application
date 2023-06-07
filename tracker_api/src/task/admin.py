from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from task.models import Item

admin.site.register(Item, GuardedModelAdmin)
