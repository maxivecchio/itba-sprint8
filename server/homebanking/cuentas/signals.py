from django.db.models.signals import post_migrate
from django.dispatch import receiver
from cuentas.models import TipoCuenta

@receiver(post_migrate)
def create_default_tipos_cuenta(sender, **kwargs):
    """
    Crea los tipos de cuenta por defecto después de aplicar migraciones.
    """
    tipos_cuenta = [
        {"nombre_tipo_cuenta": "Caja de ahorro", "moneda": "ARS"},
        {"nombre_tipo_cuenta": "Caja de ahorro", "moneda": "USD"},
        {"nombre_tipo_cuenta": "Cuenta corriente", "moneda": "ARS"},
    ]

    for tipo in tipos_cuenta:
        tipo_cuenta, created = TipoCuenta.objects.get_or_create(**tipo)
        if created:
            print(f"TipoCuenta creada: {tipo}")
        else:
            print(f"TipoCuenta ya existente: {tipo}")
