from rest_framework.viewsets import ModelViewSet
from prestamos.models import Prestamo
from cuentas.models import TipoCuenta, CuentaCliente 
from clientes.models import Cliente
from prestamos.serializers import PrestamoSerializer
from cuentas.serializers import TipoCuentaSerializer, CuentaClienteSerializer

class PrestamoViewSet(ModelViewSet):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer
