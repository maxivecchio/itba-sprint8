from rest_framework.routers import DefaultRouter
from .views import DireccionViewSet, SucursalViewSet

router = DefaultRouter()
router.register(r'direcciones', DireccionViewSet)
router.register(r'sucursales', SucursalViewSet)

urlpatterns = [
    *router.urls,
]
