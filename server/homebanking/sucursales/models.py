from django.db import models

class Direccion(models.Model):
    id_direccion = models.AutoField(primary_key=True)
    nombre_direccion = models.CharField(max_length=45)

    class Meta:
        db_table = 'Direccion'
        verbose_name = 'Dirección'
        verbose_name_plural = 'Direcciones'

    def __str__(self):
        return self.nombre_direccion


class Sucursal(models.Model):
    id_sucursal = models.AutoField(primary_key=True)
    nombre_sucursal = models.CharField(max_length=50)
    direccion_detalle = models.CharField(max_length=255)
    direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE, db_column='fk_sucursal_direccion_id')

    class Meta:
        db_table = 'Sucursal'
        verbose_name = 'Sucursal'
        verbose_name_plural = 'Sucursales'

    def __str__(self):
        return self.nombre_sucursal
