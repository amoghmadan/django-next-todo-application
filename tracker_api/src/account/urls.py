from django.urls import path

from account.apps import AccountConfig
from account.views import DetailAPIView, LoginAPIView, LogoutAPIView

app_name = AccountConfig.name

urlpatterns = [
    path("detail/", DetailAPIView.as_view(), name="detail"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
]
