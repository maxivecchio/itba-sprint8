from rest_framework.viewsets import ModelViewSet
from .models import TipoCliente, Cliente 
from .serializers import TipoClienteSerializer, ClienteSerializer

class TipoClienteViewSet(ModelViewSet):
    queryset = TipoCliente.objects.all()
    serializer_class = TipoClienteSerializer


class ClienteViewSet(ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer