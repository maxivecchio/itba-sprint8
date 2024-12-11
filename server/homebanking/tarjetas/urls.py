from rest_framework.routers import DefaultRouter
from .views import TarjetaViewSet, MarcaTarjetaViewSet
from sucursales.views import DireccionViewSet, SucursalViewSet

router = DefaultRouter()
router.register(r'direcciones', DireccionViewSet)
router.register(r'sucursales', SucursalViewSet)
router.register(r'marcas-tarjetas', MarcaTarjetaViewSet)
router.register(r'tarjetas', TarjetaViewSet)

urlpatterns = [
    *router.urls, 
]
