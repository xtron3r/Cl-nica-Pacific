
  $(document).ready(function() {
    // Validación del formulario de contacto
    $('#form').validate({
      rules: {
        txt_rut: {
          required: true,
          minlength: 8,
          maxlength: 9,
        }
      },
      messages: {
        txt_rut: {
          required: 'Por favor ingrese un RUT',
          minlength: 'El RUT debe tener al menos 8 caracteres',
          maxlength: 'El RUT debe tener como máximo 9 caracteres'
        }
      },
      errorPlacement: function(error, element) {
        /*el mensaje aparece alado del boton*/
        error.insertAfter(element.next('.btn'));
      },
      submitHandler: function(form) {
      }
    });

    
    $('#btnvalida').click(function() {
      $('#form').validate().element('#txt_rut'); 
    });
  });

  function eliminar(button) {
    button.closest('tr').remove();
  }

