####################
# Standard Imports #
####################

########################
# Non-Standard Imports #
########################
from django.urls import path

#########################
# Project Level Imports #
#########################
from .views import RegisterView, LoginView, DetailView, LogoutView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("detail/", DetailView.as_view(), name="detail"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
