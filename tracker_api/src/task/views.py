from rest_framework import viewsets

from task.filters import ItemFilterSet
from task.models import Item
from task.serializers import ItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    """Item View Set"""

    filterset_class = ItemFilterSet
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
