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
                    required: true,
                    minlength: 5,
                    maxlength: 80
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
                    required: "Por Favor ingrese nombre de la especialidad ",
                    minlength: "El minimo de caracteres es 5",
                    maxlength: "El maximo de caracteres es 80"
                }

            },
            submitHandler: function(form) {
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
            pacientesCargados = true; // Marcar los medicos como cargados
        }
    });

});



//-----------------------------------------------------------------------------
// CONTACTOS

// CARGA LOS CONTACTOS DEL LOCAL STORAGE
function cargarContactos() {
    $('#tablaContacto tbody').empty();
    if(localStorage.getItem('contactos')){
        var contactos = JSON.parse(localStorage.getItem('contactos'));
        contactos.forEach(function(contacto){
            mostrarTabla(contacto.nombre, contacto.motivo,contacto.email,contacto.telefono,contacto.textarea);
        });
    }
}

// MUESTRA EN LA TABLA DEL LOCAL STORAGE DEL CONTACTO
function mostrarTabla(nombre,motivo,email,telefono,textarea) {
    console.log(localStorage)

    $('#tablaContacto tbody').append(`
        <tr class="text-center">
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
function eliminarContacto(boton){
    var row = $(boton).closest('tr');
    var cols = row.children('td');
    if(boton.textContent === 'Cancelar'){
        $(cols[0]).text($cols[0]).find('input').val();
        $(cols[1]).text($cols[1]).find('input').val();
        $(boton).prev().text('Editar').removeClass('btn-warning').addClass('btn-info');
        $(boton).text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
    } else {
        eliminaStorage(row.index());
        row.remove();
    }
}

//ELIMINA ELMINAR DEL LOCAL STORAGE DE CONTACTO
function eliminaStorage(index){
    var contactos = JSON.parse(localStorage.getItem('contactos'));
    contactos.splice(index, 1);
    localStorage.setItem('contactos', JSON.stringify(contactos));
}




//-----------------------------------------------------------------------------------------------------------------------------
// MEDICOS

function cargarMedicos() {
    $('#tablaMedico tbody').empty();
    if(localStorage.getItem('medicos')){
        var medicos = JSON.parse(localStorage.getItem('medicos'));
        medicos.forEach(function(medico){
            mostrarTablaMedico(medico.rut,medico.nombre,medico.nombreE);
        });
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
function mostrarTablaMedico(rut,nombre,nombreE) {
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


// ELIMINA DE LA TABLA DE MEDICO
function eliminarMedico(boton){
    var row = $(boton).closest('tr');
    var cols = row.children('td');
    if(boton.textContent === 'Cancelar'){
        $(cols[0]).text($cols[0]).find('input').val();
        $(cols[1]).text($cols[1]).find('input').val();
        $(boton).prev().text('Editar').removeClass('btn-warning').addClass('btn-info');
        $(boton).text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
    } else {
        eliminaStorageMedico(row.index());
        row.remove();
    }
}

//ELIMINA ELMINAR DEL LOCAL STORAGE DE MEDICO
function eliminaStorageMedico(index){
    var medicos = JSON.parse(localStorage.getItem('medicos'));
    medicos.splice(index, 1);
    localStorage.setItem('medicos', JSON.stringify(medicos));
}

// EDITAR MEDICOS

function editarMedico(button){
    var row = $(button).closest('tr');
    var cols = row.children('td');
    if(button.textContent == 'Editar'){
        $(cols[0]).html(`<input type="text" class="form-control" value="${$(cols[0]).text()}">`);
        $(cols[1]).html(`<input type="text" class="form-control" value="${$(cols[1]).text()}">`);
        $(cols[2]).html(`<input type="text" class="form-control" value="${$(cols[2]).text()}">`);
        $(button).text('Guardar').removeClass('btn-info').addClass('btn-success');
        $(button).next().text('Cancelar').removeClass('btn-danger').addClass('btn-warning');
    } else { // Guardar
        var newNombre = $(cols[0]).find('input').val();
        var newRut = $(cols[1]).find('input').val();
        var newEspe = $(cols[2]).find('input').val();
        $(cols[0]).text(newNombre);
        $(cols[1]).text(newRut);
        $(cols[2]).text(newEspe);
        $(button).text('Editar').removeClass('btn-success').addClass('btn-info');
        $(button).next().text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
        actualizarMedico(row.index(), newNombre, newRut, newEspe);
    }
}

function actualizarMedico(index, newNombre, newRut, newEspe) {
    var medicos = JSON.parse(localStorage.getItem('medicos'));
    medicos[index].nombre = newNombre;
    medicos[index].rut = newRut;
    medicos[index].nombreE = newEspe;    
    localStorage.setItem('medicos', JSON.stringify(medicos));
}


//PACIENTES

function cargarPacientes() {
    $('#tablaPaciente tbody').empty();
    if(localStorage.getItem('pacientes')){
        var pacientes = JSON.parse(localStorage.getItem('pacientes'));
        pacientes.forEach(function(paciente){
            mostrarTablapa(paciente.nombre, paciente.rut, paciente.prevision, paciente.especialidadSeleccionada, paciente.fecha, paciente.hora);
        });
    }
}

// MUESTRA EN LA TABLA DEL LOCAL STORAGE DEL PACIENTE
function mostrarTablapa(nombre, rut, prevision, especialidad, fecha, hora) {
    $('#tablaPaciente tbody').append(`
        <tr class="text-center">
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

// ELIMINA DE LA TABLA DE PACIENTES
function eliminarPaciente(boton){
    var row = $(boton).closest('tr');
    var cols = row.children('td');
    if(boton.textContent === 'Cancelar'){
        $(cols[0]).text($cols[0]).find('input').val();
        $(cols[1]).text($cols[1]).find('input').val();
        $(boton).prev().text('Editar').removeClass('btn-warning').addClass('btn-info');
        $(boton).text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
    } else {
        eliminaStorageMedico(row.index());
        row.remove();
    }
}

//ELIMINA DEL LOCAL STORAGE DE PACIENTES
function eliminaStoragepa(index){
    var pacientes = JSON.parse(localStorage.getItem('pacientes'));
    pacientes.splice(index, 1);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
}
