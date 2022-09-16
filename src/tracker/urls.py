"""tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

v1 = [
    path("user/", include("user.urls"), name="user"),
    path("task/", include("task.urls"), name="task"),
]

apis = [
    path("v1/", include(v1), name="v1"),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(apis), name="api"),
    path("", TemplateView.as_view(template_name="home/index.html"), name="home"),
    path(
        "dashboard/",
        TemplateView.as_view(template_name="dashboard/index.html"),
        name="dashboard",
    ),
]
