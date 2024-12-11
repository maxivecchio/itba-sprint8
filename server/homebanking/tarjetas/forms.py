from django import forms
from .models import Tarjeta, MarcaTarjeta

class FormularioTarjeta(forms.ModelForm):
    class Meta:
        model = Tarjeta
        fields = ['numero', 'cvv', 'fecha_otorgamiento', 'fecha_expiracion', 'tipo', 'marca']
        labels = {
            'numero': 'Número de Tarjeta',
            'cvv': 'CVV',
            'fecha_otorgamiento': 'Fecha de Otorgamiento',
            'fecha_expiracion': 'Fecha de Expiración',
            'tipo': 'Tipo de Tarjeta',
            'marca': 'Marca de la Tarjeta'
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['marca'].queryset = MarcaTarjeta.objects.all()
