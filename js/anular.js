document.addEventListener('DOMContentLoaded', function() {
  function validarRut(rut) {
      // Eliminar puntos y guion del rut
      rut = rut.replace(/\./g, '').replace(/\-/g, '');

      // Separar el dígito verificador
      var dv = rut.slice(-1);
      var rutSinDV = rut.slice(0, -1);

      // Validar rut
      if (/^\d+$/.test(rutSinDV) === false) return false;

      // Calcular dígito verificador esperado
      var suma = 0;
      var multiplo = 2;

      for (var i = rutSinDV.length - 1; i >= 0; i--) {
          suma += parseInt(rutSinDV.charAt(i)) * multiplo;
          multiplo = multiplo === 7 ? 2 : multiplo + 1;
      }

      var dvEsperado = 11 - (suma % 11);

      // Si el dígito verificador es 11, cambiar a 0
      dvEsperado = (dvEsperado === 11) ? 0 : ((dvEsperado === 10) ? 'K' : dvEsperado);

      // Validar dv
      if (dvEsperado != dv.toUpperCase()) return false;

      return true;
  }

  function validarFormulario() {
      var rutInput = document.getElementById('txt_rut');
      var rut = rutInput.value.trim();
      var mensajeError = document.getElementById('mensaje-error');

      mensajeError.innerHTML = '';
      if (rut === '') {
          mensajeError.innerHTML = 'Debe ingresar un RUT.';
          return false;
      }
      if (rut.length > 12) {
          mensajeError.innerHTML = 'El RUT ingresado es demasiado largo.';
          return false;
      }
      if (rut.length < 8) {
          mensajeError.innerHTML = 'El RUT ingresado es demasiado corto.';
          return false;
      }

      if (!validarRut(rut)) {
          mensajeError.innerHTML = 'El RUT ingresado no es válido.';
          return false;
      }

      return true;
  }
  document.getElementById('btnvalida').addEventListener('click', function() {
      if (validarFormulario()) {
          var rut = localStorage.getItem("rut");
          var fecha = localStorage.getItem("fecha");
          var hora = localStorage.getItem("hora");
          var nombre = localStorage.getItem("nombre");

          if (rut && fecha && hora && nombre) {
              var rut = document.getElementById('txt_rut').value.trim();
              var tableRows = document.querySelectorAll("#tableBody tr");
              var rutExistente = false;

              if (!rutExistente) {
                  var newRow = document.createElement("tr"); //crear el tr
                  newRow.innerHTML = `
                      <td>${nombre}</td>
                      <td>${fecha}</td>
                      <td>${hora}</td>
                      <td>Especialidad</td>
                      <td>
                          <button type="button" class="btn btn-danger btn-anular fw-bold" onclick="eliminar(this)">
                              <i class="bi bi-trash"></i>
                          </button>
                      </td>
                  `;

                  // Verificar si ya existe un tbody en la tabla
                  var tableBody = document.getElementById("tableBody");
                  if (!tableBody) {
                      // Si no existe, crear uno nuevo
                      tableBody = document.createElement("tbody");
                      tableBody.id = "tableBody";
                      document.querySelector("table").appendChild(tableBody);
                  }

                  // Agregar la fila al tbody
                  tableBody.appendChild(newRow);
              } else {
                  alert("Rut existente");
              }
          } else {
              alert("No hay datos guardados");
          }
      }
  });
});

function eliminar(button) {
  button.closest('tr').remove();
}
