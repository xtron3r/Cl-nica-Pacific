from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Paciente
from .models import Medico

class PacientePOSTTest(APITestCase):
    def test_create_paciente(self):
        url = reverse('paciente-list-create')
        data = {
            "nombrepa": "Juan Pérez",
            "rut_paciente": "12345678-9",
            "prevision": "FONASA"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Paciente.objects.count(), 1)
        self.assertEqual(Paciente.objects.first().nombrepa, "Juan Pérez")


class PacienteGETTest(APITestCase):
    def setUp(self):
        Paciente.objects.create(nombrepa="Ana Soto", rut_paciente="98765432-1", prevision="ISAPRE")

    def test_list_pacientes(self):
        url = reverse('paciente-list-create')
        response = self.client.get(url)
        try:
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data), 1)
            self.assertEqual(response.data[0]["nombrepa"], "Ana Soto")
        except AssertionError as e:
            print(f"❌ Test List Pacientes falló: {e}")
            raise
        else:
            print("✅ Test List Pacientes pasó correctamente")


class PacientePUTTest(APITestCase):
    def setUp(self):
        self.paciente = Paciente.objects.create(nombrepa="Carlos Ruiz", rut_paciente="12345678-0", prevision="PARTICULAR")

    def test_update_paciente(self):
        url = reverse('paciente-detail', args=[self.paciente.pk])
        data = {
            "nombrepa": "Carlos R.",
            "rut_paciente": "12345678-0",
            "prevision": "ISAPRE"
        }
        response = self.client.put(url, data, format='json')
        try:
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.paciente.refresh_from_db()
            self.assertEqual(self.paciente.nombrepa, "Carlos R.")
            self.assertEqual(self.paciente.prevision, "ISAPRE")
        except AssertionError as e:
            print(f"❌ Test Update Paciente falló: {e}")
            raise
        else:
            print("✅ Test Update Paciente pasó correctamente")


class PacienteDELETETest(APITestCase):
    def setUp(self):
        self.paciente = Paciente.objects.create(nombrepa="Laura Díaz", rut_paciente="11111111-1", prevision="FONASA")

    def test_delete_paciente(self):
        url = reverse('paciente-detail', args=[self.paciente.pk])
        response = self.client.delete(url)
        try:
            self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
            self.assertFalse(Paciente.objects.filter(pk=self.paciente.pk).exists())
        except AssertionError as e:
            print(f"❌ Test Delete Paciente falló: {e}")
            raise
        else:
            print("✅ Test Delete Paciente pasó correctamente")


class PacienteDELETETest(APITestCase):
    def setUp(self):
        self.paciente = Paciente.objects.create(nombrepa="Laura Díaz", rut_paciente="11111111-1", prevision="FONASA")

    def test_delete_paciente(self):
        url = reverse('paciente-detail', args=[self.paciente.pk])
        response = self.client.delete(url)
        try:
            self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
            self.assertFalse(Paciente.objects.filter(pk=self.paciente.pk).exists())
        except AssertionError as e:
            print(f"❌ Test Delete Paciente falló: {e}")
            raise
        else:
            print("✅ Test Delete Paciente pasó correctamente")

#PRUEBAS MEDICOS
class MedicoGETTest(APITestCase):
    def setUp(self):
        Medico.objects.create(nombrem="Julio Rivera", rut_medico="22837213-1", especialidad="Telemedicina")
        
    def test_list_medico(self):
        url = reverse('medico-list-create')
        response = self.client.get(url)
        try:
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data), 1)
            self.assertEqual(response.data[0]["nombrem"], "Julio Rivera")
        except AssertionError as e:
            print(f"❌ Test List Medico falló: {e}")
            raise
        else:
            print("✅ Test List Medico pasó correctamente")
            
class MedicoDELETETest(APITestCase):
    def setUp(self):
        self.medico = Medico.objects.create(
            nombrem="Julio Rivera", 
            rut_medico="22837213-1", 
            especialidad="Telemedicina",
            disponibilidad="DISPONIBLE"
        )

    def test_delete_medico(self):
        url = reverse('medico-detail', args=[self.medico.pk])  
        response = self.client.delete(url)
        try:
            self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
            self.assertFalse(Medico.objects.filter(pk=self.medico.pk).exists())
        except AssertionError as e:
            print(f"❌ Test Delete Medico falló: {e}")
            raise
        else:
            print("✅ Test Delete Medico pasó correctamente")

class MedicoPOSTTest(APITestCase):
    def test_create_medico(self):
        url = reverse('medico-list-create')
        data = {
            "nombrem": "Martin Vargas",
            "rut_medico": "12443234-9",
            "especialidad": "Medicina General",
            "disponibilidad": "DISPONIBLE"
        }
        response = self.client.post(url, data, format='json')
        print("📤 Datos enviados:", data)
        print("📥 Respuesta:", response.data)

        try:
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.assertEqual(Medico.objects.count(), 1)
            self.assertEqual(Medico.objects.first().nombrem, "Martin Vargas")
        except AssertionError as e:
            print(f"❌ Test Create Medico falló: {e}")
            raise
        else:
            print("✅ Test Create Medico pasó correctamente")
            
class MedicoPUTTest(APITestCase):
    def setUp(self):
        self.medico = Medico.objects.create(nombrem="Miguel Angel", rut_medico="12345623-5", especialidad="Oftalmologia", disponibilidad="NODISPONIBLE")

    def test_update_medico(self):
        url = reverse('medico-detail', args=[self.medico.pk])
        data = {
            "nombrem": "Miguelito Angel",
            "rut_medico": "12345623-5",
            "especialidad": "Oftalmologia",
            "disponibilidad": "DISPONIBLE"
        }
        response = self.client.put(url, data, format='json')
        try:
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.medico.refresh_from_db()
            self.assertEqual(self.medico.nombrem, "Miguelito Angel")
            self.assertEqual(self.medico.disponibilidad, "DISPONIBLE")
        except AssertionError as e:
            print(f"❌ Test Update Medico falló: {e}")
            raise
        else:
            print("✅ Test Update Medico pasó correctamente")
