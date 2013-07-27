$(document).ready(function() {
  $('.control-button').each(function(){
    $(this).click(function() {
      console.log($(this))
      $.get('http://10.0.1.4:3001/' + $(this).data('action') + '/' + $(this).data('value'))
    })
  })
})
