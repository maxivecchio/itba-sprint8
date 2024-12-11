from cuentas.models import TipoCuenta, CuentaCliente 
from prestamos.models import Prestamo 
from rest_framework import serializers

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = '__all__'
