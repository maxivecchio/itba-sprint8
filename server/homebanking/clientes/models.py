from django.db import models
from django.contrib.auth.models import User
from sucursales.models import Sucursal

# Modelos
class TipoCliente(models.Model):
    id_tipo_cliente = models.AutoField(primary_key=True)
    nombre_tipo_cliente = models.CharField(max_length=50)
    cantidad_tarjetas = models.IntegerField()
    limite_retiro = models.IntegerField()
    tarifa = models.FloatField()

    class Meta:
        db_table = 'TipoCliente'
        verbose_name = 'Tipo de Cliente'
        verbose_name_plural = 'Tipos de Cliente'

    def __str__(self):
        return self.nombre_tipo_cliente


from django.db import models
from django.contrib.auth.models import User

class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=10)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    fecha_nacimiento = models.DateField()
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cliente", default=None)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE, null=True, blank=True) 
    """direccion = models.ForeignKey('sucursales.Direccion', on_delete=models.CASCADE) """

    class Meta:
        db_table = 'Cliente'
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'


    def __str__(self):
        return f"{self.nombre} {self.apellido}"
