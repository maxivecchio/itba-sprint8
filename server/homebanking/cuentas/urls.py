from rest_framework.routers import DefaultRouter
from .views import TipoCuentaViewSet, CuentaClienteViewSet, CuentaClienteView
from django.urls import path

router = DefaultRouter()
router.register(r'tipos-cuentas', TipoCuentaViewSet)
router.register(r'cuentas-clientes', CuentaClienteViewSet)

urlpatterns = [
    *router.urls, 
    path('cuentas/', CuentaClienteView.as_view(), name='cuentas_cliente'),
]