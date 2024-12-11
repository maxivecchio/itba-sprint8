from rest_framework.viewsets import ModelViewSet
from .models import TipoCuenta, CuentaCliente
from .serializers import TipoCuentaSerializer, CuentaClienteSerializer

class TipoCuentaViewSet(ModelViewSet):
    queryset = TipoCuenta.objects.all()
    serializer_class = TipoCuentaSerializer


class CuentaClienteViewSet(ModelViewSet):
    queryset = CuentaCliente.objects.all()
    serializer_class = CuentaClienteSerializer