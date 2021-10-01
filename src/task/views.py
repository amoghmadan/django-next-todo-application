####################
# Standard Imports #
####################

########################
# Non-Standard Imports #
########################
from rest_framework import viewsets

#########################
# Project Level Imports #
#########################
from .models import Item
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    """Item View Set: CRUD Operations Specific to User"""

    queryset = Item.objects.order_by("-created")
    serializer_class = ItemSerializer
    filterset_fields = {"status": ["exact"]}

    def get_queryset(self):
        """Get user specific Items"""

        queryset = super(ItemViewSet, self).get_queryset()
        return queryset.filter(user=self.request.user)
