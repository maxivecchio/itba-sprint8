from rest_framework import serializers
from django.contrib.auth.models import User
from clientes.models import Cliente

class RegistroSerializer(serializers.ModelSerializer):
    dni = serializers.CharField(max_length=10)
    nombre = serializers.CharField(max_length=50)
    apellido = serializers.CharField(max_length=50)
    fecha_nacimiento = serializers.DateField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'dni', 'nombre', 'apellido', 'fecha_nacimiento']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        dni = validated_data.pop('dni')
        nombre = validated_data.pop('nombre')
        apellido = validated_data.pop('apellido')
        fecha_nacimiento = validated_data.pop('fecha_nacimiento')

        user = User.objects.create_user(**validated_data)

        Cliente.objects.create(
            usuario=user,
            dni=dni,
            nombre=nombre,
            apellido=apellido,
            fecha_nacimiento=fecha_nacimiento,
        )
        return user
    
    
