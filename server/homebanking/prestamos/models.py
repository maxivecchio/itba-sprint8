from django.db import models
from clientes.models import Cliente

class Prestamo(models.Model):
    id_prestamo = models.AutoField(primary_key=True)
    metodo_pago = models.CharField(max_length=50)
    fecha_prestamo = models.DateField()
    monto_total = models.IntegerField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='fk_prestamo_cliente_id')

    class Meta:
        db_table = 'Prestamo'
        verbose_name = 'Préstamo'
        verbose_name_plural = 'Préstamos'

    def __str__(self):
        return f"Préstamo {self.id_prestamo} - Total: {self.monto_total}"