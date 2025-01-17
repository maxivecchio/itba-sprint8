from django.apps import AppConfig
from django.db.models.signals import post_migrate

class TarjetasConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tarjetas'

    def ready(self):
            from .signals import create_default_marcas
            post_migrate.connect(create_default_marcas, sender=self)