from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from .views import RegistroView

urlpatterns = [
    path('login/', obtain_auth_token, name='api_login'),
    path('register/', RegistroView.as_view(), name='api_register'),
]
