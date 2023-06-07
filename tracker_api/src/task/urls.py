from rest_framework import routers

from task.apps import TaskConfig
from task.views import ItemViewSet

app_name = TaskConfig.name

router = routers.DefaultRouter()
router.register(r"items", ItemViewSet, basename="item")

urlpatterns = []
urlpatterns += router.urls
