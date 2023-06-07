from rest_framework import serializers

from task.models import Item


class ItemSerializer(serializers.ModelSerializer):
    """Item Serializer"""

    class Meta:
        model = Item
        exclude = ["user"]
