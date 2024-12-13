from rest_framework.viewsets import ModelViewSet
from .models import TipoCuenta, CuentaCliente
from .serializers import TipoCuentaSerializer, CuentaClienteSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from cuentas.models import CuentaCliente
from clientes.models import Cliente
from rest_framework import status

class TipoCuentaViewSet(ModelViewSet):
    queryset = TipoCuenta.objects.all()
    serializer_class = TipoCuentaSerializer


class CuentaClienteViewSet(ModelViewSet):
    queryset = CuentaCliente.objects.all()
    serializer_class = CuentaClienteSerializer
    
class CuentaClienteView(APIView):
    """
    Devuelve las cuentas del cliente autenticado.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cliente = request.user.cliente
        cuentas = CuentaCliente.objects.filter(cliente=cliente)
        serializer = CuentaClienteSerializer(cuentas, many=True)
        return Response(serializer.data)