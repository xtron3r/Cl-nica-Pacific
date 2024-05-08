$(document).ready(function() {
    $("#formulario").validate({
      rules: {
        rutinput: {
          required: true,
          minlength: 8,
          maxlength: 9
        },
        nombrecom: {
          required: true
        },
        prevision: {
          required: true
        }
      },
      messages: {
        rutinput: {
          required: "Por favor ingrese su RUT.",
          minlength: "El RUT debe tener al menos 8 caracteres.",
          maxlength: "El RUT no puede tener más de 9 caracteres."
        },
        nombrecom: {
          required: "Por favor ingrese su nombre completo."
        },
        prevision: {
          required: "Por favor ingrese su previsión."
        }
      }
    });
  });
