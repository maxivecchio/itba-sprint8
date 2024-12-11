from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from clientes.models import Cliente

class FormularioAutenticacionPersonalizado(AuthenticationForm):
    username = forms.CharField(max_length=255, label="Usuario")
    password = forms.CharField(widget=forms.PasswordInput, label="Contraseña")

class FormularioRegistro(forms.ModelForm):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)
    email = forms.EmailField()
    dni = forms.CharField(max_length=10)
    nombre = forms.CharField(max_length=50)
    apellido = forms.CharField(max_length=50)
    fecha_nacimiento = forms.DateField(widget=forms.SelectDateWidget(years=range(1900, 2025)))

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def save(self, commit=True):
        # Imprimir los datos limpios antes de guardar
        print("Datos limpios del formulario:", self.cleaned_data)
        
        user = super().save(commit=False)
        
        # Imprimir datos del usuario antes de guardar
        print("Usuario a guardar:", user)
        
        user.set_password(self.cleaned_data['password'])
        
        if commit:
            user.save()
            print("Usuario guardado exitosamente:", user)

        cliente = Cliente.objects.create(
            dni=self.cleaned_data['dni'],
            nombre=self.cleaned_data['nombre'],
            apellido=self.cleaned_data['apellido'],
            fecha_nacimiento=self.cleaned_data['fecha_nacimiento'],
            usuario=user
        )

        # Imprimir los datos del cliente creado
        print("Cliente creado exitosamente:", cliente)

        return user
