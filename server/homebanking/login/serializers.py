import random
from rest_framework import serializers
from clientes.models import TipoCliente, Cliente
from django.contrib.auth.models import User
from tarjetas.models import Tarjeta, MarcaTarjeta

def generar_numero_tarjeta():
    return ''.join([str(random.randint(0, 9)) for _ in range(16)])

class RegistroSerializer(serializers.ModelSerializer):
    dni = serializers.CharField(max_length=10)
    nombre = serializers.CharField(max_length=50)
    apellido = serializers.CharField(max_length=50)
    fecha_nacimiento = serializers.DateField()
    tipo_cliente = serializers.CharField()  # Cambiado a CharField para aceptar nombres

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'dni', 'nombre', 'apellido', 'fecha_nacimiento', 'tipo_cliente']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print("Datos recibidos para crear el usuario:", validated_data)

        dni = validated_data.pop('dni')
        nombre = validated_data.pop('nombre')
        apellido = validated_data.pop('apellido')
        fecha_nacimiento = validated_data.pop('fecha_nacimiento')
        tipo_cliente_nombre = validated_data.pop('tipo_cliente')

        # Buscar TipoCliente por nombre
        try:
            tipo_cliente = TipoCliente.objects.get(nombre=tipo_cliente_nombre)
            print(f"TipoCliente encontrado: {tipo_cliente}")
        except TipoCliente.DoesNotExist:
            print(f"Error: TipoCliente {tipo_cliente_nombre} no encontrado.")
            raise serializers.ValidationError({"tipo_cliente": "Tipo de cliente inválido."})

        # Crear usuario
        user = User.objects.create_user(**validated_data)
        print(f"Usuario creado: {user}")

        # Crear cliente
        cliente = Cliente.objects.create(
            usuario=user,
            dni=dni,
            nombre=nombre,
            apellido=apellido,
            fecha_nacimiento=fecha_nacimiento,
            tipo_cliente=tipo_cliente,
        )
        print(f"Cliente creado: {cliente}")

        # Crear tarjeta de débito por defecto
        marca_tarjeta = MarcaTarjeta.objects.first()
        if marca_tarjeta:
            Tarjeta.objects.create(
                numero=generar_numero_tarjeta(),
                cvv=random.randint(100, 999),
                tipo="Débito",
                cliente=cliente,
                marca=marca_tarjeta,
            )
            print(f"Tarjeta de débito creada para el cliente {cliente}.")
        else:
            print("Error: No se encontró ninguna MarcaTarjeta.")

        print(f"Registro finalizado para el usuario {user.username}.")
        return user
