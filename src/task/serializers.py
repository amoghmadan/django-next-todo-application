####################
# Standard Imports #
####################

########################
# Non-Standard Imports #
########################
from rest_framework import serializers

#########################
# Project Level Imports #
#########################
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    """Item Serializer"""

    def validate(self, attrs):
        """Add context request user to attrs"""

        attrs["user"] = self.context["request"].user
        return attrs

    class Meta:
        """Item Serializer Meta Fields"""

        model = Item
        exclude = ["user"]
