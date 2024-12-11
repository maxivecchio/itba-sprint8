from rest_framework.viewsets import ModelViewSet
from .models import Empleado
from .serializers import EmpleadoSerializer

class EmpleadoViewSet(ModelViewSet):
    queryset = Empleado.objects.all() 
    serializer_class = EmpleadoSerializer 
