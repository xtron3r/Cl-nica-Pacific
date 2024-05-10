$(document).ready(function(){   
   $('#FormLogin').validate({
        rules:{
           FormRut:{
                required: true,
                minlength: 5
           }
        },
        messages: {
            FormRut: {
                required: "Por Favor ingrese ",
                minlength: "El minimo de caracteres es 5"
            }
            
            
        },
        submitHandler: function(form) {}
    });
});