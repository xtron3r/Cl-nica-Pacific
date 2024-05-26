/**$(document).ready(function() {
    $('#guardar').click(function() {
      var fecha = $('#fecha').val();
      var hora = $('#hora').val();
      
      // Guardar la fecha y hora en localStorage
      localStorage.setItem('fecha', fecha);
      localStorage.setItem('hora', hora);
      
      // Mostrar la hora seleccionada en la tabla
      mostrarHoraSeleccionada(fecha, hora);
      alert("Fecha y hora guardadas correctamente.");
    });
  
    // Comprobar si hay una fecha y hora guardadas en localStorage al cargar la página
    var fechaGuardada = localStorage.getItem('fecha');
    var horaGuardada = localStorage.getItem('hora');
    if (fechaGuardada && horaGuardada) {
      mostrarHoraSeleccionada(fechaGuardada, horaGuardada);
    }
    
    function mostrarHoraSeleccionada(fecha, hora) {
      $('#tableBody').html('<tr><td>' + fecha + '</td><td>' + hora + '</td></tr>');
    }
});
  console.log(localStorage);*/

  $(document).ready(function () {
    let monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();

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
  });
