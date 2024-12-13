from django.apps import AppConfig
from django.db.models.signals import post_migrate

class ClientesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'clientes'

    def ready(self):
        from .signals import create_default_tipos_cliente
        post_migrate.connect(create_default_tipos_cliente, sender=self)
        import clientes.signals
