from rest_framework import serializers

from task.models import Item


class ItemSerializer(serializers.ModelSerializer):
    """Item Serializer"""

    class Meta:
        """Item Serializer Meta Fields"""

        model = Item
        exclude = ["user"]
