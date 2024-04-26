$(document).ready(function(){

    $('#contactform').validate({
       rules:{
        formMotivo: {
            required: true,
            minlength: 10,
            maxlength: 100
        },
        formNombre:{
            required: true,
            minlength: 5,
            maxlength: 80
        },
        formEmail:{
            required: true,
            email: true,
            minlength: 5,
            maxlength: 50
        },
        formTelefono:{
            required: true,
            number: true,
            minlength: 9,
            maxlength: 9
        },
        formTextarea:{
            required: true,
            minlength: 10
        }
       },
       messages: {
        formMotivo: {
            required: 'Por favor ingrese un motivo',
            minlength: 'El motivo debe tener al menos 10 caracteres',
            maxlength: 'El motivo debe tener como máximo 100 caracteres'
        },
        formNombre:{
            required: 'Por favor ingrese su nombre',
            minlength: 'El nombre debe tener al menos 2 caracteres',
            maxlength: 'El nombre debe tener como máximo 50 caracteres'
        },
        formEmail:{
            required: 'Por favor ingrese su email',
            email: 'Por favor ingrese un email válido',
            minlength: 'El email debe tener al menos 5 caracteres',
            maxlength: 'El email debe tener como máximo 50 caracteres'
        },
        formTelefono:{
            required: 'Por favor ingrese su teléfono',
            minlength: 'El teléfono debe tener al menos 9 caracteres',
            maxlength: 'El teléfono debe tener como máximo 9 caracteres',
            number: 'Por favor ingrese un teléfono válido (CHILE)'
        },
        formTextarea:{
            required: 'Por favor ingrese un mensaje',
            minlength: 'El mensaje debe tener al menos 10 caracteres'
        }
       },
       submitHandler: function(form) {
            form.reset();
            return false; // Previene la recarga de la página
       }
    })
});