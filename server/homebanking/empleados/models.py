from django.db import models
from sucursales.models import Sucursal, Direccion

class Empleado(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    fecha_contratacion = models.DateField()
    dni = models.CharField(max_length=10)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE, db_column='fk_empleado_sucursal_id')
    direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE, db_column='fk_empleado_direccion_id')

    class Meta:
        db_table = 'Empleado'
        verbose_name = 'Empleado'
        verbose_name_plural = 'Empleados'

    def __str__(self):
        return f"{self.nombre} {self.apellido}"
