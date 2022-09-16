from django.contrib.auth import authenticate, get_user_model
from django.db import IntegrityError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    """User Serializer"""

    password = serializers.CharField(
        label=_("Password"),
        write_only=True,
        max_length=128,
        style={"input_type": "password"},
    )
    confirm_password = serializers.CharField(
        label=_("Confirm password"),
        write_only=True,
        max_length=128,
        style={"input_type": "password"},
    )

    class Meta:
        """Fields for end-point"""

        model = get_user_model()
        fields = (
            "first_name",
            "last_name",
            "email",
            "password",
            "confirm_password",
            "date_joined",
        )
        read_only_fields = ["read_only"]

    def validate(self, attrs):
        """Validate passwords"""
        if attrs["password"] != attrs.pop("confirm_password"):
            msg = _("Both the passwords should match.")
            raise serializers.ValidationError(msg)
        return attrs

    def create(self, validated_data):
        """Create user or if exists throw 400"""
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        try:
            return self.Meta.model.objects.create_user(
                email, email, password, **validated_data
            )
        except IntegrityError:
            msg = _("User with this email already exists.")
            raise serializers.ValidationError(msg)


class TokenSerializer(serializers.ModelSerializer):
    """Token Serializer"""

    email = serializers.EmailField(label=_("Email"), write_only=True)
    password = serializers.CharField(
        label=_("Password"),
        write_only=True,
        max_length=128,
        style={"input_type": "password"},
    )
    token = serializers.CharField(label=_("Token"), read_only=True, source="key")

    class Meta:
        """Fields for end-point"""

        model = Token
        fields = ("email", "password", "token")

    def validate(self, attrs):
        """Authenticate user and update it to attrs"""
        email = attrs.pop("email")
        password = attrs.pop("password")
        user = authenticate(
            request=self.context["request"],
            username=email,
            password=password,
        )
        if not user:
            msg = _("Unable to log in with provided credentials.")
            raise serializers.ValidationError(msg, code="authorization")
        attrs["user"] = user
        return attrs

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            return self.Meta.model.objects.get(**validated_data)
