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
        
        //localStorage.clear();
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

    $('#actualizarPag').click(function() {
        cargarContactos();
    });
});


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

// MUESTRA EN LA TABLA DEL LOCAL STORAGE
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


// ELIMINA DE LA TABLA
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

//ELIMINA ELMINAR DEL LOCAL STORAGE
function eliminaStorage(index){
    var contactos = JSON.parse(localStorage.getItem('contactos'));
    contactos.splice(index, 1);
    localStorage.setItem('contactos', JSON.stringify(contactos));
}