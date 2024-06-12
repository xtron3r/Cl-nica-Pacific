from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactoViewSet,MedicoViewSet,PacienteViewSet,ReservaViewSet



router = DefaultRouter()
router.register('contacto', ContactoViewSet)
router.register('medico', MedicoViewSet)
router.register('paciente', PacienteViewSet)
router.register('reserva', ReservaViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
