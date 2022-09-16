from django.urls import path

from user.views import RegisterView, LoginView, DetailView, LogoutView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("detail/", DetailView.as_view(), name="detail"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
