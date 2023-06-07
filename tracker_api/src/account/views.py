from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token

from account.serializers import TokenSerializer, UserSerializer


class LoginAPIView(generics.CreateAPIView):
    """Login API View"""

    permission_classes = [permissions.AllowAny]
    serializer_class = TokenSerializer


class DetailAPIView(generics.RetrieveAPIView):
    """Detail API View"""

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class LogoutAPIView(generics.DestroyAPIView):
    """Logout API View"""

    queryset = Token.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        return queryset.get(user=self.request.user)
