$(document).ready(function () {
  let monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  let now = new Date();
  let day = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();

   // Función para cargar los médicos desde la base de datos según la especialidad seleccionada
   function cargarMedicos() {
    var especialidadSeleccionada = localStorage.getItem("especialidadSeleccionada");
    $.ajax({
        url: 'http://localhost:8000/api/medico/', // URL de tu API para obtener médicos
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Limpiar opciones anteriores
            $('#medicosele').empty();

            // Filtrar médicos por especialidad seleccionada
            response.forEach(function(medico) {
                if (medico.especialidad === especialidadSeleccionada) {
                    $('#medicosele').append(`<option value="${medico.rut_medico}">NOMBRE: ${medico.nombrem} | ESPECIALIDAD: ${medico.especialidad}  </option>`);
                }
            });
        },
        error: function(error) {
            console.error('Error al cargar médicos:', error);
        }
    });
  }

  // Llamar a la función para cargar médicos según la especialidad almacenada en localStorage
  cargarMedicos();

  // Función para actualizar el calendario
  function updateCalendar() {
    $("#text_month").text(monthName[month]);
    $("#text_year").text(year);

    $(".days").empty();
    let totalDays = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1).getDay();

    for (let i = 1; i <= totalDays; i++) {
      let $day = $("<li>").addClass("calendar-day").text(i);
      if (year < now.getFullYear() || (year === now.getFullYear() && (month < now.getMonth() || (month === now.getMonth() && i < day)))) {
        $day.addClass("inactive");
      }
      $(".days").append($day);
    }
  }

  // Inicializar calendario
  updateCalendar();

  // Botón mes siguiente
  $("#next").click(function () {
    if (month === 11) {
      month = 0;
      year++;
    } else {
      month++;
    }
    updateCalendar();
  });

  // Botón mes anterior
  $("#prev").click(function () {
    if (month === 0) {
      month = 11;
      year--;
    } else {
      month--;
    }
    updateCalendar();
  });

  // Función para generar las horas disponibles
  function generateHourSlots() {
    const $hoursContainer = $(".hours");
    $hoursContainer.empty(); // Limpiar cualquier hora existente

    for (let i = 8; i <= 19; i++) { // De 8:00 AM a 7:00 PM
      for (let j = 0; j < 2; j++) { // Dos intervalos por hora
        const period = i < 12 ? 'AM' : 'PM';
        const hourText = i <= 12 ? i : i - 12;
        const minuteText = j === 0 ? '00' : '30';
        const $hourSlot = $("<div></div>")
          .addClass("hour-slot inactive") // Inicialmente inactivo
          .text(`${hourText}:${minuteText} ${period}`);
        $hoursContainer.append($hourSlot);
      }
    }
  }

  // Generar las horas disponibles cuando se carga la página
  generateHourSlots();

  // Selección de hora
  $(document).on("click", ".hour-slot", function () {
    if (!$(this).hasClass("inactive")) {
      $(".hour-slot").removeClass("active");
      $(this).addClass("active");
    }
  });

  $(document).on("click", ".calendar-day", function () {
    if (!$(this).hasClass("inactive")) {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(".hour-slot").addClass("inactive").removeClass("active");
      } else {
        $(".calendar-day").removeClass("active");
        $(this).addClass("active");
        $(".hour-slot").removeClass("inactive");
      }
    }
  });

  // Al hacer clic en el botón "SOLICITAR", guardar la fecha y hora en localStorage
  $('#guardar').click(function() {
    var fecha = $('#text_year').text() + '-' + (month + 1) + '-' + $('.calendar-day.active').text(); // Formatear fecha
    var hora = $('.hour-slot.active').text();
    
    // Crear el objeto paciente
    var paciente = {
        rut: localStorage.getItem("rut"),
        nombre: localStorage.getItem("nombre"),
        previsionpa: localStorage.getItem("prevision"),
        especialidadSeleccionada: localStorage.getItem("especialidadSeleccionada"),
        fecha: fecha,
        hora: hora
    };

    // Agregar el paciente a la lista de pacientes en bd
    var data = {
        rut_paciente: localStorage.getItem("rut"),
        nombrepa: localStorage.getItem("nombre"),
        prevision: localStorage.getItem("prevision")
    }

    $.ajax({
      url: "http://localhost:8000/api/paciente/",
      type: "POST",
      data: JSON.stringify(data), 
      contentType: "application/json",
      success: function(response) {
          console.log('SUCCESS!', response);
          alert('Paciente guardado correctamente!');
      },
      error: function(error) {
          alert('No se pudo guardar paciente!');
          console.log('FAILED...', error);
      }
    });

    // Creamos la reserva para la base de datos

      // Crear los datos para la reserva
    var data1 = {
      fecha: fecha,
      hora: hora,
      paciente: localStorage.getItem("rut") // Obtener el rut del paciente del localStorage
    };

    // Enviar solicitud POST para la reserva
    $.ajax({
      url: "http://localhost:8000/api/reserva/",
      type: "POST",
      data: JSON.stringify(data1),
      contentType: "application/json",
      success: function(response) {
          console.log('SUCCESS!', response);
          alert('Reserva guardada correctamente!');
      },
      error: function(error) {
          alert('No se pudo guardar la reserva!');
          console.log('FAILED...', error);
      }
    });
    
    // Agregar el paciente a la lista de pacientes en localStorage
    agregarPaciente(paciente);
    
    // Mostrar la hora seleccionada en la tabla
    cargarPacientes();
    alert("Fecha y hora guardadas correctamente.");

    // Desactivar todas las horas
    $('.hour-slot').addClass('inactive').removeClass('active');

    // Desactivar el botón "SOLICITAR"
    $(this).prop('disabled', true);
});

// Función para agregar un paciente a la lista de pacientes en localStorage
function agregarPaciente(nuevoPaciente) {
    let pacientes = [];
    if(localStorage.getItem('pacientes')){
        pacientes = JSON.parse(localStorage.getItem('pacientes'));
    }
    pacientes.push(nuevoPaciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
}

// Función para cargar los pacientes y mostrarlos en la tabla al cargar la página
$(document).ready(function() {
    cargarPacientes();
});

// Función para cargar los pacientes y mostrarlos en la tabla
function cargarPacientes() {
    $('#tableBody').empty();
    if(localStorage.getItem('pacientes')){
        var pacientes = JSON.parse(localStorage.getItem('pacientes'));
        pacientes.forEach(function(paciente){
            mostrarPaciente(paciente);
        });
    }
}

// Función para mostrar un paciente en la tabla
function mostrarPaciente(paciente) {
    // Construir la fila con los datos del paciente y la fecha, hora y especialidad seleccionadas
    var newRow = `
      <tr>
        <td>${paciente.nombre}</td>
        <td>${paciente.rut}</td>
        <td>${paciente.fecha}</td>
        <td>${paciente.hora}</td>
        <td>${paciente.prevision}</td>
        <td>${paciente.especialidadSeleccionada}</td>
      </tr>
    `;
  
    // Agregar la fila a la tabla
    $('#tableBody').append(newRow);
}
});
