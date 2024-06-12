from rest_framework import viewsets
from .models import Contacto,Medico,Paciente,Reserva
from django.contrib.auth.models import User
from .serializers import ContactoSerializer, MedicoSerializer,PacienteSerializer,ReservaSerializer

# Create your views here.
class ContactoViewSet(viewsets.ModelViewSet):
    queryset = Contacto.objects.all() 
    serializer_class = ContactoSerializer

class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
