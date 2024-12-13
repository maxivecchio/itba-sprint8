from .models import Cliente, TipoCliente
from django.db.models.signals import post_save
from django.dispatch import receiver

from cuentas.models import CuentaCliente, TipoCuenta

def create_default_tipos_cliente(sender, **kwargs):
    default_clientes = [
        {"nombre": "Classic", "cantidad_tarjetas_debito": 1, "cantidad_tarjetas_credito": 0, "limite_retiro": 10000, "limite_negativo": 0, "tarifa": 1.0},
        {"nombre": "Gold", "cantidad_tarjetas_debito": 1, "cantidad_tarjetas_credito": 1, "limite_retiro": 10000, "limite_negativo": -10000, "tarifa": 0.5},
        {"nombre": "Black", "cantidad_tarjetas_debito": 1, "cantidad_tarjetas_credito": 5, "limite_retiro": 100000, "limite_negativo": -10000, "tarifa": 0.0},
    ]

    for cliente in default_clientes:
        TipoCliente.objects.get_or_create(**cliente)


@receiver(post_save, sender=Cliente)
def crear_cuentas_cliente(sender, instance, created, **kwargs):
    if created:
        cuentas_por_tipo = {
            "Classic": ["Caja de ahorro (ARS)"],
            "Gold": ["Caja de ahorro (ARS)", "Caja de ahorro (USD)"],
            "Black": ["Caja de ahorro (ARS)", "Caja de ahorro (USD)", "Cuenta corriente (ARS)"],
        }

        tipo_cliente = instance.tipo_cliente.nombre

        tipos_cuentas = cuentas_por_tipo.get(tipo_cliente, [])

        for tipo_cuenta_nombre in tipos_cuentas:
            moneda = tipo_cuenta_nombre.split(" (")[1][:-1] 
            tipo_cuenta = TipoCuenta.objects.filter(nombre_tipo_cuenta=tipo_cuenta_nombre.split(" (")[0], moneda=moneda).first()

            if tipo_cuenta:
                CuentaCliente.objects.create(
                    saldo=0,
                    cliente=instance,
                    tipo_cuenta=tipo_cuenta,
                )
