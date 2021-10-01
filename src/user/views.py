####################
# Standard Imports #
####################

########################
# Non-Standard Imports #
########################
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

#########################
# Project Level Imports #
#########################
from .serializers import TokenSerializer, UserSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """Register New User"""

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(generics.GenericAPIView):
    """Login Registered User"""

    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        """Get or Create Token"""

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        instance, created = self.queryset.get_or_create(user=user)
        return Response(self.get_serializer(instance).data)


class DetailView(generics.RetrieveAPIView):
    """Get User Details"""

    serializer_class = UserSerializer

    def get_object(self):
        """Get the Logged-in user"""

        return self.request.user


class LogoutView(generics.DestroyAPIView):
    """Logout Logged-in User"""

    queryset = Token.objects.all()

    def get_object(self):
        """Get the token for Logged-in user"""

        return self.queryset.filter(user=self.request.user)
