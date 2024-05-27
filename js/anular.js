document.addEventListener('DOMContentLoaded', function() {
    function validarRut(rut) {
        rut = rut.replace(/\./g, '').replace(/\-/g, '');
  
        var dv = rut.slice(-1).toUpperCase();
        var rutSinDV = rut.slice(0, -1);
  
        if (!/^\d+$/.test(rutSinDV)) return false;
  
        var suma = 0;
        var multiplo = 2;
  
        for (var i = rutSinDV.length - 1; i >= 0; i--) {
            suma += parseInt(rutSinDV.charAt(i)) * multiplo;
            multiplo = multiplo === 7 ? 2 : multiplo + 1;
        }
  
        var dvEsperado = 11 - (suma % 11);
        dvEsperado = (dvEsperado === 11) ? '0' : ((dvEsperado === 10) ? 'K' : dvEsperado.toString());
  
        return dvEsperado === dv;
    }
  
    function mensajeError(mensaje) {
        var mensajeError = document.getElementById('mensaje-error');
        mensajeError.innerHTML = mensaje;
    }
  
    function validarFormulario() {
        var rutInput = document.getElementById('txt_rut');
        var rut = rutInput.value.trim();
  
        mensajeError('');
        if (rut === '') {
            mensajeError('Debe ingresar un RUT.');
            return false;
        }
        if (rut.length > 12) {
            mensajeError('El RUT ingresado es demasiado largo.');
            return false;
        }
        if (rut.length < 8) {
            mensajeError('El RUT ingresado es demasiado corto.');
            return false;
        }
  
        if (!validarRut(rut)) {
            mensajeError('El RUT ingresado no es válido.');
            return false;
        }
  
        return true;
    }
  
    function agregarFila(nombre, fecha, hora, especialidad) {
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${nombre}</td>
            <td>${fecha}</td>
            <td>${hora}</td>
            <td>${especialidad}</td>
            <td>
                <button type="button" class="btn btn-danger btn-anular fw-bold" onclick="eliminar(this)">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
  
        var tableBody = document.getElementById("tableBody");
        if (!tableBody) {
            tableBody = document.createElement("tbody");
            tableBody.id = "tableBody";
            document.querySelector("table").appendChild(tableBody);
        }
  
        tableBody.appendChild(newRow);
    }
  
    function buscarDatos() {
        if (validarFormulario()) {
            var rut = document.getElementById('txt_rut').value.trim();
            var fecha = localStorage.getItem("fecha");
            var hora = localStorage.getItem("hora");
            var nombre = localStorage.getItem("nombre");
            var especialidad = localStorage.getItem("especialidadSeleccionada");

            
  
            if (localStorage.getItem("rut") === rut) {
                var tableBody = document.getElementById("tableBody");
                var rutExistente = Array.from(tableBody.rows).some(row => row.cells[0].textContent === nombre);
  
                if (!rutExistente) {
                    agregarFila(nombre, fecha, hora, especialidad);
                } else {
                    mensajeError("El paciente ya existe en la tabla.");
                }
            } else {
                mensajeError("El RUT no existe.");
            }
        }
    }
  
    document.getElementById('btnvalida').addEventListener('click', function(event) {
        event.preventDefault();
        buscarDatos();
    });
});

function eliminar(button) {
    var row = button.closest('tr');
    var nombre = row.cells[0].textContent;

    // Eliminar del localStorage si coincide con el nombre
    if (localStorage.getItem("nombre") === nombre) {
        localStorage.removeItem("rut");
        localStorage.removeItem("fecha");
        localStorage.removeItem("hora");
        localStorage.removeItem("nombre");
        localStorage.removeItem("especialidadSeleccionada");
    }
    row.remove();
}
