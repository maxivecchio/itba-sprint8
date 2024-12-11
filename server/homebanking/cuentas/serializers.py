from rest_framework import serializers
from .models import TipoCuenta, CuentaCliente

class TipoCuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCuenta
        fields = '__all__'


class CuentaClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuentaCliente
        fields = '__all__'