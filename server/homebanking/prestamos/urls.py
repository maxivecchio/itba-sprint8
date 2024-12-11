from rest_framework.routers import DefaultRouter
from .views import PrestamoViewSet
from cuentas.views import TipoCuentaViewSet, CuentaClienteViewSet

router = DefaultRouter()
router.register(r'tipos-cuentas', TipoCuentaViewSet)
router.register(r'cuentas-clientes', CuentaClienteViewSet)
router.register(r'prestamos', PrestamoViewSet)

urlpatterns = [
    *router.urls, 
]
