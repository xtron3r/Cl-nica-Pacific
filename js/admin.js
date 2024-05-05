$(document).ready(function() {

    $('#contacto').hide();
    $('#pacientes').hide();
    $('#medicos').hide();
    $('#AgregMedico').hide();
    

    $('#btn-contacto').click(function() {
        $('#contacto').show();
        $('#pacientes').hide();
        $('#medicos').hide();
        $('#AgregMedico').hide();
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