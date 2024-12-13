from rest_framework.viewsets import ModelViewSet
from .models import MarcaTarjeta, Tarjeta
from .serializers import MarcaTarjetaSerializer, TarjetaSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from tarjetas.models import Tarjeta
from .serializers import TarjetaSerializer

class MarcaTarjetaViewSet(ModelViewSet):
    queryset = MarcaTarjeta.objects.all()
    serializer_class = MarcaTarjetaSerializer


class TarjetaViewSet(ModelViewSet):
    queryset = Tarjeta.objects.all()
    serializer_class = TarjetaSerializer
    
from rest_framework import serializers
from tarjetas.models import Tarjeta

class TarjetaSerializer(serializers.ModelSerializer):
    marca = serializers.CharField(source='marca.nombre')
    numero = serializers.SerializerMethodField()  

    class Meta:
        model = Tarjeta
        fields = ['id_tarjeta', 'numero', 'cvv', 'fecha_otorgamiento', 'fecha_expiracion', 'tipo', 'marca']

    def get_numero(self, obj):
        return f"{obj.numero[-4:]}"


class TarjetasUsuarioView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cliente = request.user.cliente  
        tarjetas = Tarjeta.objects.filter(cliente=cliente)
        serializer = TarjetaSerializer(tarjetas, many=True)
        return Response(serializer.data)