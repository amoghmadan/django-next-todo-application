from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token

from user.serializers import TokenSerializer, UserSerializer


class RegisterView(generics.CreateAPIView):
    """Register New User"""

    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(generics.CreateAPIView):
    """Login Registered User"""

    serializer_class = TokenSerializer
    permission_classes = [permissions.AllowAny]


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
        return self.queryset.get(user=self.request.user)
