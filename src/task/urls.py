####################
# Standard Imports #
####################

########################
# Non-Standard Imports #
########################
from rest_framework import routers

#########################
# Project Level Imports #
#########################
from .views import ItemViewSet

router = routers.DefaultRouter()
router.register(r"items", ItemViewSet, "item")

urlpatterns = router.urls
