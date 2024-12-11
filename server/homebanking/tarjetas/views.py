from rest_framework.viewsets import ModelViewSet
from .models import MarcaTarjeta, Tarjeta
from .serializers import MarcaTarjetaSerializer, TarjetaSerializer

class MarcaTarjetaViewSet(ModelViewSet):
    queryset = MarcaTarjeta.objects.all()
    serializer_class = MarcaTarjetaSerializer


class TarjetaViewSet(ModelViewSet):
    queryset = Tarjeta.objects.all()
    serializer_class = TarjetaSerializer