$(document).ready(function() {

    // Variable para saber si los contactos ya han sido cargados y evitar duplicado 
    var contactosCargados = false;

    // VISTAS DEl ADMINISTRADOR
    $('#contacto').hide();
    $('#pacientes').hide();
    $('#medicos').hide();
    $('#AgregMedico').hide();
    
    $('#btn-contacto').click(function() {
        $('#contacto').show();
        $('#pacientes').hide();
        $('#medicos').hide();
        $('#AgregMedico').hide();
        
        if (!contactosCargados) {
            cargarContactos();
            contactosCargados = true; // Marcar los contactos como cargados
        }
        
       // localStorage.clear();
    });

    $('#btn-medico').click(function() {
        $('#medicos').show();
        $('#contacto').hide();
        $('#pacientes').hide();
        $('#AgregMedico').hide();
    });

    $('#btn-paciente').click(function() {
        $('#pacientes').show();
        $('#contacto').hide();
        $('#medicos').hide();
        $('#AgregMedico').hide();
    });

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
});

function cargarContactos() {
    if(localStorage.getItem('contactos')){
        var contactos = JSON.parse(localStorage.getItem('contactos'));
        contactos.forEach(function(contacto){
            mostrarTabla(contacto.nombre, contacto.motivo,contacto.email,contacto.telefono,contacto.textarea);
        });
    }
}

function mostrarTabla(nombre,motivo,email,telefono,textarea) {


    console.log(localStorage)

    $('#tablaContacto tbody').append(`
        <tr>
            <td>${motivo}</td>
            <td>${nombre}</td>
            <td>${email}</td>
            <td>${telefono}</td>
            <td>${textarea}</td>
        </tr>
    `);
}