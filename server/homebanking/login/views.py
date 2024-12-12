from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import RegistroSerializer
from rest_framework.permissions import IsAuthenticated
from clientes.models import Cliente

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class RegistroView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario registrado con éxito"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        try:
            cliente = Cliente.objects.get(usuario=request.user)
            return Response({
                "id": cliente.id_cliente,
                "dni": cliente.dni,
                "nombre": cliente.nombre,
                "apellido": cliente.apellido,
                "fecha_nacimiento": cliente.fecha_nacimiento,
                "email": request.user.email, 
                "username": request.user.username, 
            })
        except Cliente.DoesNotExist:
            return Response({"error": "Cliente no encontrado"}, status=404)