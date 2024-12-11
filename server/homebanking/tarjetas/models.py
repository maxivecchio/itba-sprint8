from django.db import models
from clientes.models import Cliente

class MarcaTarjeta(models.Model):
    id_marca = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)

    class Meta:
        db_table = 'MarcaTarjeta'
        verbose_name = 'Marca de Tarjeta'
        verbose_name_plural = 'Marcas de Tarjetas'

    def __str__(self):
        return self.nombre


class Tarjeta(models.Model):
    id_tarjeta = models.AutoField(primary_key=True)
    numero = models.CharField(max_length=20)
    cvv = models.IntegerField()
    fecha_otorgamiento = models.DateField(null=True, blank=True)
    fecha_expiracion = models.DateField(null=True, blank=True)
    tipo = models.CharField(max_length=25, null=True, blank=True)
    marca = models.ForeignKey(MarcaTarjeta, on_delete=models.CASCADE, db_column='fk_tarjeta_marca_id')
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='fk_tarjeta_cliente_id')

    class Meta:
        db_table = 'Tarjeta'
        verbose_name = 'Tarjeta'
        verbose_name_plural = 'Tarjetas'

    def __str__(self):
        return f"{self.tipo.capitalize()} {self.numero}"