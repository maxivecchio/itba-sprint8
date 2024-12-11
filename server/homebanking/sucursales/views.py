from rest_framework.viewsets import ModelViewSet
from .models import Direccion, Sucursal
from .serializer import DireccionSerializer, SucursalSerializer

class DireccionViewSet(ModelViewSet):
    queryset = Direccion.objects.all()
    serializer_class = DireccionSerializer


class SucursalViewSet(ModelViewSet):
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer