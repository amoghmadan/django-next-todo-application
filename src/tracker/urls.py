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

apis = [
    path("user/", include("user.urls"), name="user"),
    path("task/", include("task.urls"), name="task"),
]

home_view = TemplateView.as_view(template_name="home/index.html")
dashboard_view = TemplateView.as_view(template_name="dashboard/index.html")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(apis), name="apis"),
    path("", home_view, name="home"),
    path("dashboard/", dashboard_view, name="dashboard"),
]
