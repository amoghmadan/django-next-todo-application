from django.contrib.auth import authenticate, get_user_model
from django.db import IntegrityError
from django.utils.translation import gettext_lazy
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    """User Serializer"""

    class Meta:
        model = get_user_model()
        fields = ["username", "first_name", "last_name", "email", "date_joined"]
        read_only_fields = ["date_joined"]


class TokenSerializer(serializers.ModelSerializer):
    """Token Serializer"""

    username = serializers.CharField(label=gettext_lazy("Username"), write_only=True)
    password = serializers.CharField(
        label=gettext_lazy("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )
    token = serializers.CharField(
        label=gettext_lazy("Token"),
        read_only=True,
        source="key",
    )

    class Meta:
        model = Token
        fields = ["username", "password", "token"]

    def validate(self, attrs):
        username = attrs.pop("username")
        password = attrs.pop("password")

        if username and password:
            user = authenticate(
                request=self.context.get("request"),
                username=username,
                password=password,
            )

            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = gettext_lazy("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = gettext_lazy('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs

    def create(self, validated_data):
        try:
            instance = super().create(validated_data)
        except IntegrityError:
            instance = self.Meta.model.objects.get(user=validated_data["user"])
        return instance
