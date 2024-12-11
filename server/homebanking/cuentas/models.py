from django.db import models
from clientes.models import Cliente

# Modelos
class TipoCuenta(models.Model):
    id_tipo_cuenta = models.AutoField(primary_key=True)
    nombre_tipo_cuenta = models.CharField(max_length=50)
    moneda = models.CharField(max_length=10)

    class Meta:
        db_table = 'TipoCuenta'
        verbose_name = 'Tipo de Cuenta'
        verbose_name_plural = 'Tipos de Cuenta'

    def __str__(self):
        return self.nombre_tipo_cuenta


class CuentaCliente(models.Model):
    id_cuenta_cliente = models.AutoField(primary_key=True)
    saldo = models.IntegerField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='fk_cuenta_cliente_id')
    tipo_cuenta = models.ForeignKey(TipoCuenta, on_delete=models.CASCADE, db_column='fk_tipo_cuenta_id')

    class Meta:
        db_table = 'CuentaCliente'
        verbose_name = 'Cuenta del Cliente'
        verbose_name_plural = 'Cuentas de Clientes'

    def __str__(self):
        return f"Cuenta {self.id_cuenta_cliente} - Saldo: {self.saldo}"