from rest_framework import serializers
from .models import MarcaTarjeta, Tarjeta

class MarcaTarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarcaTarjeta
        fields = '__all__'


class TarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarjeta
        fields = '__all__'