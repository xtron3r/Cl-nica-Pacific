$(document).ready(function() {

    // Variable para saber si ya han sido cargados y evitar duplicado 
    var contactosCargados = false;
    var medicosCargados = false;
    var pacientesCargados = false;

    

    // VISTAS DEl ADMINISTRADOR
    $('#contacto').hide();
    $('#pacientes').hide();
    $('#medicos').hide();
    $('#AgregMedico').hide();

    $('#btn-limpiar').click(function() {
        $('#pacientes').hide();
        $('#contacto').hide();
        $('#medicos').hide();
        $('#AgregMedico').hide();
    });

    $('#btn-agregarM').click(function() {
        $('#AgregMedico').show();
        $('#contacto').hide();
        $('#pacientes').hide();
        $('#medicos').hide();
    });

    $('#btn-cancelarM').click(function() {
        $('#medicos').show();
        $('#pacientes').hide();
        $('#contacto').hide();
        $('#AgregMedico').hide();
    });

    // CONTACTO

    $('#btn-contacto').click(function() {
        $('#contacto').show();
        $('#pacientes').hide();
        $('#medicos').hide();
        $('#AgregMedico').hide();
        
        if (!contactosCargados) {
            cargarContactos();
            contactosCargados = true; // Marcar los contactos como cargados
        }
        
        //localStorage.clear();
    });
    $('#actualizarPag').click(function() {
        cargarContactos();
    });


    //MEDICO

    $('#btn-guardarM').click(function(){
        $('#formMedico').validate({
            rules:{
                rutinput:{
                    required: true,
                    number: true,
                    minlength: 9,
                    maxlength:9
                },
                nombreMedico:{
                    required: true,
                    minlength: 5,
                    maxlength: 80
                },
                nombreEspecialidad:{
                    required:true
                }            
            },
            messages:{
                rutinput:{
                    required: "Por Favor ingrese rut ",
                    number: "Por favor ingrese solo numeros",
                    minlength: "El minimo de caracteres es 9",
                    maxlength: "El maximo de caracteres es 9"
                },
                nombreMedico:{
                    required: "Por Favor ingrese nombre del medico ",
                    minlength: "El minimo de caracteres es 5",
                    maxlength: "El maximo de caracteres es 80"
                },
                nombreEspecialidad:{
                    required: "Porfavor ingrese especialidad"
                }

            },
            submitHandler: function(form) {

                var data = {
                    rut_medico : $('#rutinput').val(),
                    nombrem : $('#nombreMedico').val(),
                    especialidad : $('#nombreEspecialidad').val()

                };

                $.ajax({
                    url: "http://localhost:8000/api/medico/",
                    type: "POST",
                    data: JSON.stringify(data), 
                    contentType: "application/json",
                    success: function(response) {
                        console.log('SUCCESS!', response);
                        alert('Medico agregado correctamente')
                        form.reset();
                    },
                    error: function(error) {
                        alert('No se pudo agregar el medico!');
                        console.log('FAILED...', error);
                    }
                });
                
                addmedico();
                alert('MEDICO AÑADIDO CORRECTAMENTE');
                form.reset();
                return false; // Previene la recarga de la pagina
            }
        }); 
    });

    $('#btn-medico').click(function() {
        $('#medicos').show();
        $('#contacto').hide();
        $('#pacientes').hide();
        $('#AgregMedico').hide();

        if (!medicosCargados) {
            cargarMedicos();
            medicosCargados = true; // Marcar los medicos como cargados
        }
    });
    
    $('#buscarRut').click(function() {
        var rut = $('#dondevarut').val(); // Obtener el valor del campo de entrada
        if (rut.trim() === '') {
            cargarMedicos(); // Si el campo está vacío, cargar todos los médicos
        } else {
            buscarMedicoPorRut(rut);
        }
    });

    $('#actualizarMed').click(function() {
        cargarMedicos();
    });


    //PACIENTE

    $('#btn-paciente').click(function() {
        $('#pacientes').show();
        $('#contacto').hide();
        $('#medicos').hide();
        $('#AgregMedico').hide();

        if (!pacientesCargados) {
            cargarPacientes();
            pacientesCargados = true; 
        }
    });

    $('#btnvalida').click(function() {
        var rut = $('#txt_rut').val(); 
        if (rut.trim() === '') {
            cargarPacientes(); 
        } else {
            buscarPacientePorRut(rut);
        }
    });

    $('#actualizarPa').click(function() {
        cargarPacientes();
    });

});



//-----------------------------------------------------------------------------
// CONTACTOS

// CARGA LOS CONTACTOS DEL LOCAL STORAGE
function cargarContactos() {
    $('#tablaContacto tbody').empty();

    $.ajax({
        url: 'http://localhost:8000/api/contacto/', // URL de tu API para obtener médicos
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            response.forEach(function(contacto) {
                mostrarTabla(contacto.id,contacto.nombrec,contacto.motivo,contacto.email,contacto.telefono,contacto.mensaje)
            });
        },
        error: function(error) {
            console.error('Error al cargar contactos:', error);
        }
    });
    
} 

// MUESTRA EN LA TABLA DEL LOCAL STORAGE DEL CONTACTO
function mostrarTabla(id,nombre,motivo,email,telefono,textarea) {
    console.log(localStorage)

    $('#tablaContacto tbody').append(`
        <tr class="text-center">
            <td>${id}</td>
            <td>${motivo}</td>
            <td>${nombre}</td>
            <td>${email}</td>
            <td>${telefono}</td>
            <td>${textarea}</td>
            <td>
                <button class="btn btn-danger " onclick="eliminarContacto(this)">Eliminar</button>
            </td>
        </tr>
    `);
}


// ELIMINA DE LA TABLA DE CONTACTO
function eliminarContacto(boton) {
    var row = $(boton).closest('tr');
    var id = row.find('td:first').text();
    $.ajax({
        url: `http://localhost:8000/api/contacto/${id}/`, // URL DELETE con ID específico
        type: 'DELETE',
        dataType: 'json',
        success: function() {
            alert('CONTACTO ELIMINADO');
            row.remove(); // Eliminar la fila de la tabla después de eliminar el contacto en el servidor
        },
        error: function(error) {
            console.error('Error al eliminar contacto:', error);
            alert('Error al eliminar el contacto. Consulta la consola para más detalles.');
        }
    });
}




//-----------------------------------------------------------------------------------------------------------------------------
// MEDICOS

function cargarMedicos() {
    $('#tablaMedico tbody').empty();

    $.ajax({
        url: 'http://localhost:8000/api/medico/', // URL de tu API para obtener médicos
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Filtrar médicos por especialidad seleccionada
            response.forEach(function(medico) {
                mostrarTablaMedico(medico.nombrem, medico.rut_medico, medico.especialidad);
            });
        },
        error: function(error) {
            console.error('Error al cargar médicos:', error);
        }
    });
    
} 

function buscarMedicoPorRut(rut) {
    $('#tablaMedico tbody').empty();
    $('#mensajeError').hide(); 

    if (localStorage.getItem('medicos')) {
        var medicos = JSON.parse(localStorage.getItem('medicos'));
        var medicosFiltrados = medicos.filter(function(medico) {
            return medico.rut === rut;
        });

        if (medicosFiltrados.length === 0) {
            $('#mensajeError').show();
        } else {
            medicosFiltrados.forEach(function(medico) {
                mostrarTablaMedico(medico.rut, medico.nombre, medico.nombreE);
            });
        }
    }
}

function addmedico(){
    var rut = $('#rutinput').val();
    var nombre = $('#nombreMedico').val();
    var nombreE = $('#nombreEspecialidad').val();
    var medico = { rut,nombre,nombreE}

    guardarLocalmedico(medico);
}
function guardarLocalmedico(medico){
    var medicos = localStorage.getItem('medicos') ? JSON.parse(localStorage.getItem('medicos')) : [];
    medicos.push(medico);
    localStorage.setItem('medicos', JSON.stringify(medicos));
}

// MUESTRA EN LA TABLA DEL LOCAL STORAGE DEL MEDICOS
function mostrarTablaMedico(nombre,rut,nombreE) {
    console.log(localStorage)

    $('#tablaMedico tbody').append(`
        <tr class="text-center">
            <td>${nombre}</td>
            <td>${rut}</td>
            <td>${nombreE}</td>
            <td>
                <button class="btn btn-danger " onclick="eliminarMedico(this)">Eliminar</button>
                <button class="btn btn-info " onclick="editarMedico(this)">Editar </button>
            </td>
        </tr>
    `);
}


// Función para eliminar un médico
function eliminarMedico(boton) {
    var row = $(boton).closest('tr');
    var rut = row.find('td:nth-child(2)').text();

    $.ajax({
        url: `http://localhost:8000/api/medico/${rut}/`,
        type: 'DELETE',
        dataType: 'json',
        success: function() {
            console.log('Medico eliminado');
            row.remove(); 
        },
        error: function(error) {
            console.error('Error al eliminar medico:', error);
            alert('Error al eliminar el medico');
        }
    });
}


// EDITAR MEDICOS

function editarMedico(button) {
    var row = $(button).closest('tr');
    var cols = row.children('td');

    if (button.textContent === 'Editar') {
        // Guardar los valores originales en caso de cancelación
        var originalValues = {
            nombre: $(cols[0]).text(),
            rut: $(cols[1]).text(),
            especialidad: $(cols[2]).text()
        };

        // Reemplazar texto con campos de entrada para editar
        $(cols[0]).html(`<input type="text" class="form-control" value="${originalValues.nombre}">`);
        $(cols[1]).html(`<input type="text" class="form-control" value="${originalValues.rut}">`);
        $(cols[2]).html(`<input type="text" class="form-control" value="${originalValues.especialidad}">`);

        // Cambiar texto de los botones Editar y Eliminar a Guardar y Cancelar
        $(button).text('Guardar').removeClass('btn-info').addClass('btn-success');
        $(button).next().text('Cancelar').removeClass('btn-danger').addClass('btn-warning');
    } else { // Guardar cambios
        var newNombre = $(cols[0]).find('input').val();
        var newRut = $(cols[1]).find('input').val();
        var newEspecialidad = $(cols[2]).find('input').val();

        // Actualizar la interfaz con los nuevos valores
        $(cols[0]).text(newNombre);
        $(cols[1]).text(newRut);
        $(cols[2]).text(newEspecialidad);

        // Cambiar botones de vuelta a Editar y Eliminar
        $(button).text('Editar').removeClass('btn-success').addClass('btn-info');
        $(button).next().text('Eliminar').removeClass('btn-warning').addClass('btn-danger');

        // Obtener el ID del médico desde la primera columna de la fila
        var id = $(cols[1]).text(); // Suponiendo que el RUT del médico es único y se usa como ID

        // Llamar a la función para actualizar el médico en el backend
        actualizarMedico(id, newNombre, newRut, newEspecialidad);
    }
}

function actualizarMedico(id, nombre, rut, especialidad) {
        // Verificar que los campos no estén vacíos antes de enviar la solicitud
    if (!nombre || !rut || !especialidad) {
        console.error('Todos los campos son requeridos.');
        return;
    }

    // Preparar los datos a enviar en formato JSON
    var data= {
        nombrem: nombre,
        rut_medico: rut,
        especialidad: especialidad
    };

    $.ajax({
        url: `http://localhost:8000/api/medico/${id}/`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            alert('Medico Actualizado');
            
        },
        error: function(error) {
            console.error('Error al actualizar medico:', error);
            alert('Error al actualizar el medico.');
        }
    });
}



//PACIENTES

function cargarPacientes() {
    $('#tablaPaciente tbody').empty();

    $.ajax({
        url: 'http://localhost:8000/api/reserva/', // URL de tu API para obtener médicos
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Filtrar médicos por especialidad seleccionada
            response.forEach(function(reserva) {
                mostrarTablapaciente(
                    reserva.paciente.id,
                    reserva.paciente.nombrepa,
                    reserva.paciente.rut_paciente,
                    reserva.paciente.prevision,
                    reserva.medico.especialidad,
                    reserva.fecha,
                    reserva.hora
                );
                
            });
        },
        error: function(error) {
            console.error('Error al cargar reservas', error);
        }
    });
    
} 

function buscarPacientePorRut(rut) {
    $('#tablaPaciente tbody').empty();
    $('#mensajeError').hide(); 

    if (localStorage.getItem('pacientes')) {
        var pacientes = JSON.parse(localStorage.getItem('pacientes'));
        var pacientesFiltrados = pacientes.filter(function(paciente) {
            return paciente.rut === rut;
        });

        if (pacientesFiltrados.length === 0) {
            $('#mensajeError').show();
        } else {
            pacientesFiltrados.forEach(function(paciente) {
                mostrarTablapaciente(paciente.nombre, paciente.rut, paciente.prevision, paciente.especialidadSeleccionada, paciente.fecha, paciente.hora);
            });
        }
    }
}

// MUESTRA EN LA TABLA DEL LOCAL STORAGE DEL PACIENTE
function mostrarTablapaciente(id,nombre, rut, prevision, especialidad, fecha, hora) {
    $('#tablaPaciente tbody').append(`
        <tr class="text-center">
            <td>${id}</td>
            <td>${nombre}</td>
            <td>${rut}</td>
            <td>${prevision}</td>
            <td>${especialidad}</td>
            <td>${fecha}</td>
            <td>${hora}</td>
            <td>
                <button class="btn btn-danger " onclick="eliminarPaciente(this)">Eliminar</button>
            </td>
        </tr>
    `);
}

function eliminarPaciente(boton) {
    var row = $(boton).closest('tr');
    var id = row.find('td:first').text(); // Obtener el ID del paciente desde la primera columna de la fila

    $.ajax({
        url: `http://localhost:8000/api/reserva/${id}/`, // URL DELETE con ID específico del paciente
        type: 'DELETE',
        dataType: 'json',
        success: function() {
            alert('PACIENTE ELIMINADO');
            row.remove(); // Eliminar la fila de la tabla después de eliminar el paciente en el servidor
        },
        error: function(error) {
            console.error('Error al eliminar paciente:', error);
            alert('Error al eliminar el paciente. Consulta la consola para más detalles.');
        }
    });
}

