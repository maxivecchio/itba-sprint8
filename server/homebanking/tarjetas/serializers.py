from rest_framework import serializers
from .models import MarcaTarjeta, Tarjeta

class MarcaTarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarcaTarjeta
        fields = '__all__'


class TarjetaSerializer(serializers.ModelSerializer):
    marca = serializers.CharField(source='marca.nombre')  # Popula el nombre de la marca

    class Meta:
        model = Tarjeta
        fields = ['id_tarjeta', 'numero', 'fecha_otorgamiento', 'fecha_expiracion', 'tipo', 'marca']