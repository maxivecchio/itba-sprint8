from .models import MarcaTarjeta

def create_default_marcas(sender, **kwargs):
    default_marcas = ["Visa", "MasterCard", "American Express"]
    
    for nombre in default_marcas:
        MarcaTarjeta.objects.get_or_create(nombre=nombre) 
