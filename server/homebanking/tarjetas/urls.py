from rest_framework.routers import DefaultRouter
from .views import TarjetaViewSet, MarcaTarjetaViewSet, TarjetasUsuarioView
from sucursales.views import DireccionViewSet, SucursalViewSet
from django.urls import path

router = DefaultRouter()
router.register(r'direcciones', DireccionViewSet)
router.register(r'sucursales', SucursalViewSet)
router.register(r'marcas-tarjetas', MarcaTarjetaViewSet)
router.register(r'tarjetas', TarjetaViewSet)

urlpatterns = [
    *router.urls,
    path('token/', TarjetasUsuarioView.as_view(), name='tarjetas_usuario'),
]
