from django.apps import AppConfig
from django.db.models.signals import post_migrate

class CuentasConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cuentas'
    
    def ready(self):
        import cuentas.signals