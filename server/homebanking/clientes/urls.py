from rest_framework.routers import DefaultRouter
from .views import TipoClienteViewSet, ClienteViewSet

router = DefaultRouter()
router.register(r'tipos-clientes', TipoClienteViewSet)
router.register(r'clientes', ClienteViewSet)

urlpatterns = [
    *router.urls,
]
