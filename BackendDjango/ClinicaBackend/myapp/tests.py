from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
import requests

class MedicosGetExternosTest(TestCase):
    def test_listar_medicos_externos(self):
        url = "http://localhost:8001/medicos/"
        response = requests.get(url)

        try:
            self.assertEqual(response.status_code, 200)
            medicos = response.json()
            self.assertIsInstance(medicos, list)

            print("📋 Médicos obtenidos:")
            for medico in medicos:
                print(medico)

        except AssertionError as e:
            print(f"❌ Falló al obtener médicos externos: {e}")
            raise
        else:
            print("✅ Lista de médicos obtenida correctamente.")

            
class MedicosPostTest(TestCase):   
    def test_crear_medico_externo(self):
        url = "http://localhost:8001/medicos/"
        data = {
            "nombrem": "Dra. Laura Gómez",
            "rut_medico": "12345678-9",
            "especialidad": "Pediatría",
            "disponibilidad": "DISPONIBLE"
        }
        
        response = requests.post(url, json=data)

        try:
            if response.status_code == 201:
                medico_creado = response.json()
                self.assertEqual(medico_creado["rut_medico"], data["rut_medico"])
                self.assertEqual(medico_creado["nombrem"], data["nombrem"])
                print("✅ Médico creado correctamente.")
            elif response.status_code == 400:
                error_resp = response.json()
                self.assertIn("rut_medico", error_resp)
                self.assertEqual(error_resp["rut_medico"], ["El médico con ese rut_medico ya existe."])
                print("⚠️ No se pudo crear el médico porque ya existe uno con ese rut.")
            else:
                self.fail(f"Respuesta inesperada: {response.status_code} {response.text}")
        except AssertionError as e:
            print(f"❌ Falló el test de creación de médico: {e}")
            raise
