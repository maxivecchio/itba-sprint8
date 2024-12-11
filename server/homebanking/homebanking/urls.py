from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/clientes/', include('clientes.urls')),
    path('api/cuentas/', include('cuentas.urls')),
    path('api/tarjetas/', include('tarjetas.urls')),
    path('api/prestamos/', include('prestamos.urls')),
    path('api/sucursales/', include('sucursales.urls')),
    path('api/empleados/', include('empleados.urls')),
    path('api/auth/', include('login.urls')),
]
