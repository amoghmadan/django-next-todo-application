from django_filters import rest_framework as filters

from task.models import Item


class ItemFilterSet(filters.FilterSet):
    """Item Filter Set"""

    order = filters.OrderingFilter(fields=("created",))

    class Meta:
        model = Item
        fields = {"status": ["exact"]}
