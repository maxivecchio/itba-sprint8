from rest_framework.routers import DefaultRouter
from .views import TipoCuentaViewSet, CuentaClienteViewSet

router = DefaultRouter()
router.register(r'tipos-cuentas', TipoCuentaViewSet)
router.register(r'cuentas-clientes', CuentaClienteViewSet)

urlpatterns = [
    *router.urls, 
]
