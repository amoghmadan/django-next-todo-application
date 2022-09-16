from rest_framework import routers

from task.views import ItemViewSet

router = routers.DefaultRouter()
router.register(r"items", ItemViewSet, "item")

urlpatterns = router.urls
