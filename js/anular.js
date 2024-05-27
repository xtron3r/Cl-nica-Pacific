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
  
        cargarPacientesPorRut(rut);
  
        return true;
    }
  
    function agregarFila(nombrep, rutpa, prevision, especialidad, fecha, hora) {
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${nombrep}</td>
            <td>${rutpa}</td>
            <td>${prevision}</td>
            <td>${especialidad}</td>
            <td>${fecha}</td>
            <td>${hora}</td>
            <td>
                <button type="button" class="btn btn-danger btn-anular fw-bold" onclick="eliminarPaciente(this)">
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
    

    function limpiarTabla() {
        var tableBody = document.getElementById("tableBody");
        if (tableBody) {
            tableBody.innerHTML = ''; // Elimina todas las filas de la tabla
        }
    }

    function cargarPacientesPorRut(rut) {
        limpiarTabla();
        var pacientes = JSON.parse(localStorage.getItem('pacientes'));
        if (pacientes) {
            var pacientesFiltrados = pacientes.filter(function (paciente) {
                return paciente.rut === rut;
            });
            pacientesFiltrados.forEach(function (paciente) {
                agregarFila(paciente.nombre, paciente.rut, paciente.prevision, paciente.especialidadSeleccionada, paciente.fecha, paciente.hora);
            });
        }
    }
  
    document.getElementById('btnvalida').addEventListener('click', function(event) {
        event.preventDefault();
        validarFormulario();
    });
});

function eliminarPaciente(boton){
    var row = $(boton).closest('tr');
    var cols = row.children('td');
    if(boton.textContent === 'Cancelar'){
        $(cols[0]).text($cols[0]).find('input').val();
        $(cols[1]).text($cols[1]).find('input').val();
        $(boton).prev().text('Editar').removeClass('btn-warning').addClass('btn-info');
        $(boton).text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
    } else {
        eliminaStoragepa(row.index());
        row.remove();
    }
}

//ELIMINA DEL LOCAL STORAGE DE PACIENTES
function eliminaStoragepa(index){
    var pacientes = JSON.parse(localStorage.getItem('pacientes'));
    pacientes.splice(index, 1);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
}