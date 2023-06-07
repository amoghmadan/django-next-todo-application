from django.views.static import serve
from rest_framework.decorators import api_view


@api_view(["GET"])
def media_locking_api(request, *args, **kwargs):
    """Media Locking API"""
    response = serve(request, kwargs["path"], document_root=kwargs["document_root"])
    return response
