from rest_framework import serializers
from .models import TipoCuenta, CuentaCliente

class TipoCuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCuenta
        fields = ['id_tipo_cuenta', 'nombre_tipo_cuenta', 'moneda']

class CuentaClienteSerializer(serializers.ModelSerializer):
    tipo_cuenta = TipoCuentaSerializer(read_only=True)  # Aquí usamos el nested serializer

    class Meta:
        model = CuentaCliente
        fields = ['id_cuenta_cliente', 'saldo', 'cliente', 'tipo_cuenta']