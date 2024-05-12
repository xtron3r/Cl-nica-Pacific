$(document).ready(function(){   
   $('#FormLogin').validate({
        rules:{
           FormRut:{
                required: true,
                number: true,
                minlength: 9,
                maxlength:9
           },
           FormContra:{
                required:true,
                minlength:5
           }

        },
        messages: {
            FormRut: {
                required: "Por Favor ingrese rut ",
                number: "Por favor ingrese solo numeros",
                minlength: "El minimo de caracteres es 9",
                maxlength: "El maximo de caracteres es 9"
            },
            FormContra: {
                required: "Por Favor ingrese contraseña",
                minlength: "El minimo de caracteres es 5"
            }
            
        },
        submitHandler: function(form) {
            redir()
        }
    });
});


function redir(){
    window.location.href = "admin.html";
}