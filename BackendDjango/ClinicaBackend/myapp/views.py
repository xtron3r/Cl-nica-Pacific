from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Contacto, Medico, Paciente, Reserva
from django.contrib.auth.models import User
from .serializers import (
    ContactoSerializer, MedicoSerializer, PacienteSerializer,
    ReservaSerializer, UserSerializer
)

class ContactoListCreateAPIView(APIView):
    def get(self, request):
        contactos = Contacto.objects.all()
        serializer = ContactoSerializer(contactos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ContactoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactoDetailAPIView(APIView):
    def get(self, request, pk):
        contacto = get_object_or_404(Contacto, pk=pk)
        serializer = ContactoSerializer(contacto)
        return Response(serializer.data)

    def put(self, request, pk):
        contacto = get_object_or_404(Contacto, pk=pk)
        serializer = ContactoSerializer(contacto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        contacto = get_object_or_404(Contacto, pk=pk)
        contacto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class MedicoListCreateAPIView(APIView):
    def get(self, request):
        medicos = Medico.objects.all()
        serializer = MedicoSerializer(medicos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MedicoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MedicoDetailAPIView(APIView):
    def get(self, request, pk):
        medico = get_object_or_404(Medico, pk=pk)
        serializer = MedicoSerializer(medico)
        return Response(serializer.data)

    def put(self, request, pk):
        medico = get_object_or_404(Medico, pk=pk)
        serializer = MedicoSerializer(medico, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        medico = get_object_or_404(Medico, pk=pk)
        medico.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class PacienteListCreateAPIView(APIView):
    def get(self, request):
        pacientes = Paciente.objects.all()
        serializer = PacienteSerializer(pacientes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PacienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PacienteDetailAPIView(APIView):
    def get(self, request, pk):
        paciente = get_object_or_404(Paciente, pk=pk)
        serializer = PacienteSerializer(paciente)
        return Response(serializer.data)

    def put(self, request, pk):
        paciente = get_object_or_404(Paciente, pk=pk)
        serializer = PacienteSerializer(paciente, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        paciente = get_object_or_404(Paciente, pk=pk)
        paciente.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class ReservaListCreateAPIView(APIView):
    def get(self, request):
        reservas = Reserva.objects.all()
        medico_id = request.query_params.get('medico', None)
        if medico_id:
            reservas = reservas.filter(medico__rut_medico=medico_id)
        serializer = ReservaSerializer(reservas, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ReservaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReservaDetailAPIView(APIView):
    def get(self, request, pk):
        reserva = get_object_or_404(Reserva, pk=pk)
        serializer = ReservaSerializer(reserva)
        return Response(serializer.data)

    def put(self, request, pk):
        reserva = get_object_or_404(Reserva, pk=pk)
        serializer = ReservaSerializer(reserva, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        reserva = get_object_or_404(Reserva, pk=pk)
        reserva.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class UserListCreateAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data['password']) 
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailAPIView(APIView):
    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if 'password' in request.data:
                user.set_password(request.data['password'])
                user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class BorrarTodoAPIView(APIView):
    def post(self, request):
        Reserva.objects.all().delete()
        Paciente.objects.all().delete()
        Medico.objects.all().delete()
        Contacto.objects.all().delete()
        
        return Response({"Todos los datos han sido eliminados."}, status=status.HTTP_200_OK)
