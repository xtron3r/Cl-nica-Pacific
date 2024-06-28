$(document).ready(function () {
  let monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  let now = new Date();
  let day = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();
  let medicoId;
  let reservas = [];

  function cargarMedicos() {
    var especialidadSeleccionada = localStorage.getItem("especialidadSeleccionada");
    $.ajax({
      url: 'http://localhost:8000/api/medico/',
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        var medicoContainer = $('#seleccionMedico').find('div');
        medicoContainer.empty();

        response.forEach(function(medico) {
          if (medico.especialidad === especialidadSeleccionada) {
            var medicoCard = `
              <div class="mb-3">
                <div class="row g-0">
                  <div class="col-md-10 mx-auto mt-3">
                    <div class="card-body wrapper p-2">
                      <h5 class="card-title"> <i class="bi bi-person-circle"></i> ${medico.nombrem}</h5>
                      <p class="card-text mt-2 "> <i class="bi bi-heart-pulse"></i> ${medico.especialidad}</p>
                      <input type="button" class="btn btn-back1 btn-primary fw-bold seleccionar-medico" data-rut="${medico.rut_medico}" value="SELECCIONAR">
                    </div>
                  </div>
                </div>
              </div>
            `;
            medicoContainer.append(medicoCard);
          }
        });
      },
      error: function(error) {
        console.error('Error al cargar médicos:', error);
      }
    });
  }

  cargarMedicos();

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
        deshabilitarHorasReservadas($(this).text());
      }
    }
  });

  $(document).on("click", ".seleccionar-medico", function(event) {
    var $button = $(this);
    medicoId = $(this).data("rut");
    $(".seleccionar-medico").each(function() {
      $(this).val("SELECCIONAR");
      $(this).prop("disabled", false);
    });

    $button.val("SELECCIONADO");

    console.log("Medico seleccionado con Rut: " + medicoId);
    alert("Medico seleccionado con Rut: " + medicoId);

    cargarReservasMedico(medicoId);
  });

  function cargarReservasMedico(medicoId) {
    $.ajax({
      url: `http://localhost:8000/api/reserva/?medico=${medicoId}`,
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        reservas = response;
        console.log("Reservas cargadas:", reservas);
      },
      error: function(error) {
        console.error('Error al cargar reservas:', error);
      }
    });
  }

  function deshabilitarHorasReservadas(diaSeleccionado) {
    const $hourSlots = $(".hour-slot");
    $hourSlots.removeClass("inactive");

    reservas.forEach(function(reserva) {
      let fechaReserva = new Date(reserva.fecha);
      let diaReserva = fechaReserva.getDate();
      let mesReserva = fechaReserva.getMonth();
      let anioReserva = fechaReserva.getFullYear();

      if (anioReserva === year && mesReserva === month && diaReserva == diaSeleccionado) {
        $hourSlots.each(function() {
          if ($(this).text() === reserva.hora) {
            $(this).addClass("inactive");
          }
        });
      }
    });
  }

  $('#guardar').click(function() {
    var fecha = $('#text_year').text() + '-' + (month + 1) + '-' + $('.calendar-day.active').text(); // Formatear fecha
    var hora = $('.hour-slot.active').text();
    var especialidadSeleccionada = localStorage.getItem("especialidadSeleccionada");

    // Agregar el paciente a la lista de pacientes en bd
    var data = {
      rut_paciente: localStorage.getItem("rut"),
      nombrepa: localStorage.getItem("nombre"),
      prevision: localStorage.getItem("prevision")
    };

    $.ajax({
      url: "http://localhost:8000/api/paciente/",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function(response) {
        console.log('SUCCESS!', response);
        alert('Paciente guardado correctamente!');

        // Obtener el id del paciente creado
        var pacienteId = response.id;

        var reservaData = {
          paciente: pacienteId,
          medico: medicoId,
          fecha: fecha,
          hora: hora
        };

        console.log(reservaData);

        // Enviar solicitud POST para la reserva
        $.ajax({
          url: "http://localhost:8000/api/reserva/",
          type: "POST",
          data: JSON.stringify(reservaData),
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
      },
      error: function(error) {
        alert('No se pudo guardar paciente!');
        console.log('FAILED...', error);
      }
    });

    // Crear el objeto paciente
    var paciente = {
      rut: localStorage.getItem("rut"),
      nombre: localStorage.getItem("nombre"),
      prevision: localStorage.getItem("prevision"),
      especialidadSeleccionada: especialidadSeleccionada,
      fecha: fecha,
      hora: hora
    };

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

  function agregarPaciente(nuevoPaciente) {
    let pacientes = [];
    if(localStorage.getItem('pacientes')){
      pacientes = JSON.parse(localStorage.getItem('pacientes'));
    }
    pacientes.push(nuevoPaciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }

  cargarPacientes();

  function cargarPacientes() {
    $('#tableBody').empty();
    if(localStorage.getItem('pacientes')){
      var pacientes = JSON.parse(localStorage.getItem('pacientes'));
      pacientes.forEach(function(paciente){
        mostrarPaciente(paciente);
      });
    }
  }

  function mostrarPaciente(paciente) {
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

    $('#tableBody').append(newRow);
  }
});
