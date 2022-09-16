from rest_framework import viewsets

from task.models import Item
from task.serializers import ItemSerializer
from task.filters import ItemFilterSet


class ItemViewSet(viewsets.ModelViewSet):
    """Item View Set: CRUD Operations Specific to User"""

    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filterset_class = ItemFilterSet

    def get_queryset(self):
        """Get user specific Items"""
        return super().get_queryset().filter(user=self.request.user)

    def perform_create(self, serializer):
        """Save Item with user as FK"""
        serializer.save(user=self.request.user)
