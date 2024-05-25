document.addEventListener("DOMContentLoaded", function() {
    // Función para validar el RUT chileno
    function validarRut(rut) {
        // Eliminar puntos y guión del rut (si los tiene)
        rut = rut.replace(/\./g, '').replace(/\-/g, '');

        // Separar el dígito verificador
        var dv = rut.slice(-1);
        // Obtener el cuerpo del RUT
        var rutSinDV = rut.slice(0, -1);

        // Validar el formato del RUT
        if (/^\d+$/.test(rutSinDV) === false) return false;

        // Calcular dígito verificador esperado
        var suma = 0;
        var multiplo = 2;

        for (var i = rutSinDV.length - 1; i >= 0; i--) {
            suma += parseInt(rutSinDV.charAt(i)) * multiplo;
            multiplo = multiplo === 7 ? 2 : multiplo + 1;
        }

        var dvEsperado = 11 - (suma % 11);

        // Si el dígito verificador es 11, cambiar a 0
        dvEsperado = (dvEsperado === 11) ? 0 : ((dvEsperado === 10) ? 'K' : dvEsperado);

        // Validar que el dígito verificador sea correcto
        if (dvEsperado != dv.toUpperCase()) return false;

        return true;
    }

    // Obtener los elementos del formulario
    var rutInput = document.getElementById("rutinput");
    var nombreInput = document.getElementById("nombrecom");
    var previsionSelect = document.getElementById("prevision");
    var aceptarBtn = document.getElementById("aceptarBtn");

    //funcion habilitar boton aceptar
    function actualizarBoton() {
        // habilitar el boton cuando lo demas cumpla con los requisitos
        if (rutInput.value.trim() !== "" && nombreInput.value.trim() !== "" && previsionSelect.value !== "Seleccione su prevision" && validarRut(rutInput.value.trim())) {

            aceptarBtn.disabled = false;
            rutError.textContent = "";
            nombreError.textContent = "";
            previsionError.textContent = "";
        } else {
            aceptarBtn.disabled = true;
            if (rutInput.value.trim() === "" || !validarRut(rutInput.value.trim())) {
                rutError.textContent = "RUT inválido";
            } else {
                rutError.textContent = "";
            }
            if (nombreInput.value.trim() === "") {
                nombreError.textContent = "El nombre no puede estar vacío";
            } else {
                nombreError.textContent = "";
            }
            if (previsionSelect.value.trim() === "") {
                previsionError.textContent = "Debe seleccionar una prevision";
            } else {
                previsionError.textContent = "";
            }
        }
    }

    rutInput.addEventListener("input", actualizarBoton);
    nombreInput.addEventListener("input", actualizarBoton);
    previsionSelect.addEventListener("change", actualizarBoton);

    aceptarBtn.addEventListener("click", function() {
        if (!validarRut(rutInput.value.trim())) {
            alert("El RUT ingresado no es válido.");
        } else {
            // Guarda en el localStorage
            localStorage.setItem("rut", rutInput.value.trim());
            localStorage.setItem("nombre", nombreInput.value.trim());
            localStorage.setItem("prevision", previsionSelect.value.trim());

            // dirige a la página seleccion hora
            window.location.href = "seleccion_hora.html";
        }
    });
});
