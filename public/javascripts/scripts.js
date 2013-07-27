$(document).ready(function() {
  var driver = $('#controls').data('driver')

  $('.control-button').each(function(){
    $(this).click(function() {
      $.get(driver + '/' + $(this).data('action') + '/' + $(this).data('value'))
    })
  })
})
