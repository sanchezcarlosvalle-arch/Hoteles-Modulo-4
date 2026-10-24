$(document).ready(function() {

  var $b = $('#btnAbrirModal');
  var $m = $('#reservaModal');

  $m.on('show.bs.modal', function() {
    console.log('[EVENTO MODAL 1/4] show.bs.modal: El modal comienza a abrirse.');
    $b.prop('disabled', true)
      .removeClass('btn-primary')
      .addClass('btn-secondary');
  });

  $m.on('shown.bs.modal', function() {
    console.log('[EVENTO MODAL 2/4] shown.bs.modal: El modal se terminó de abrir por completo.');
    $('#modalNombre').trigger('focus');
  });

  $m.on('hide.bs.modal', function() {
    console.log('[EVENTO MODAL 3/4] hide.bs.modal: El modal comienza a ocultarse.');
  });

  $m.on('hidden.bs.modal', function() {
    console.log('[EVENTO MODAL 4/4] hidden.bs.modal: El modal se terminó de ocultar por completo.');
    $b.prop('disabled', false)
      .removeClass('btn-secondary')
      .addClass('btn-primary');
  });

  $('#formReservaModal').on('submit', function(e) {
    e.preventDefault();
    var n = $('#modalNombre').val();

    $m.modal('hide');

    $('#alertContainer').html(
      '<div class="alert alert-success alert-dismissible fade show shadow-sm" role="alert">' +
        '<strong><span class="oi oi-circle-check mr-1"></span> ¡Excelente!</strong> ' +
        $('<div>').text(n).html() + ', tus datos fueron procesados. Podés abrir la consola (F12) para ver los 4 eventos registrados.' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span>' +
        '</button>' +
      '</div>'
    );

    this.reset();
  });

});
