from django import forms
from .models import CuentaCliente, TipoCuenta
from clientes.models import Cliente

class FormularioCuentaCliente(forms.ModelForm):
    class Meta:
        model = CuentaCliente
        fields = ['cliente', 'tipo_cuenta', 'saldo']
        labels = {
            'cliente': 'Cliente',
            'tipo_cuenta': 'Tipo de Cuenta',
            'saldo': 'Saldo Inicial',
        }
        widgets = {
            'cliente': forms.Select(attrs={'class': 'form-control'}),
            'tipo_cuenta': forms.Select(attrs={'class': 'form-control'}),
            'saldo': forms.NumberInput(attrs={'class': 'form-control'}),
        }
