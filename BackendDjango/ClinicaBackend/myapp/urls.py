from django.urls import path
from .views import (
    ContactoListCreateAPIView, ContactoDetailAPIView,
    MedicoListCreateAPIView, MedicoDetailAPIView,
    PacienteListCreateAPIView, PacienteDetailAPIView,
    ReservaListCreateAPIView, ReservaDetailAPIView,
    BorrarTodoAPIView,    
    UserListCreateAPIView, UserDetailAPIView
)

urlpatterns = [
    # Contacto
    path('contacto/', ContactoListCreateAPIView.as_view(), name='contacto-list-create'),
    path('contacto/<int:pk>/', ContactoDetailAPIView.as_view(), name='contacto-detail'),

    # Medico
    path('medico/', MedicoListCreateAPIView.as_view(), name='medico-list-create'),
    path('medico/<str:pk>/', MedicoDetailAPIView.as_view(), name='medico-detail'),

    # Paciente
    path('paciente/', PacienteListCreateAPIView.as_view(), name='paciente-list-create'),
    path('paciente/<int:pk>/', PacienteDetailAPIView.as_view(), name='paciente-detail'),

    # Reserva
    path('reserva/', ReservaListCreateAPIView.as_view(), name='reserva-list-create'),
    path('reserva/<uuid:pk>/', ReservaDetailAPIView.as_view(), name='reserva-detail'),

    # Usuario
    path('user/', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('user/<int:pk>/', UserDetailAPIView.as_view(), name='user-detail'),
    
    path('borrar-todo/', BorrarTodoAPIView.as_view(), name='borrar-todo'),

]
