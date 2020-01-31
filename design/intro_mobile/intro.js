$(document).ready(function() {
  $('#introduce').focus()

  var currentScreen = 0

  var refreshInputs = function() {
    if (currentScreen === 0) {
      var introduceValue = $('#introduce').val()

      if (introduceValue.toLowerCase().indexOf('j') === 0) {
        $('.intro-form-introduce-autocomplete').removeClass('hide')
      } else {
        $('.intro-form-introduce-autocomplete').addClass()
      }

      if (introduceValue.trim().length > 0) {
        $('.form-inline i').show()
      } else {
        $('.form-inline i').hide()
      }
    } else if (currentScreen === 1) {
      var introduceEmailValue = $('#introduce-email').val()

      if (introduceEmailValue.toLowerCase().indexOf('j') === 0) {
        $('.intro-form-introduce-email-autocomplete').removeClass('hide')
      } else {
        $('.intro-form-introduce-email-autocomplete').addClass()
      }

      if (introduceEmailValue.trim().length > 0) {
        $('.form-inline i').show()
      } else {
        $('.form-inline i').hide()
      }
    } else if (currentScreen === 2) {
      var toValue = $('#to').val()

      if (toValue.toLowerCase().indexOf('j') === 0) {
        $('.intro-form-to-autocomplete').removeClass('hide')
      } else {
        $('.intro-form-to-autocomplete').addClass()
      }

      if (toValue.trim().length > 0) {
        $('.form-inline i').show()
      } else {
        $('.form-inline i').hide()
      }
    }
  }

  $('input').on('change', function() {
    refreshInputs()
  })
  $('input').on('keyup', function(e) {
    refreshInputs()
  })
  $('input').on('blur', function() {
    refreshInputs()
  })
  $('input').on('focus', function() {
    refreshInputs()
  })
  $('input').on('input', function() {
    refreshInputs()
  })

  $('input').on('click', function(e) {
    var val = $(this).attr('value')

    if (val === 'Jools Johnson') {
      currentScreen = 1
      $('.intro-form-introduce').addClass('hide')
      $('.intro-form-introduce-autocomplete').addClass('hide')
      $('.intro-form-introduce-email').removeClass('hide')
      $('.intro-form-introduce-email input').focus()
    } else if (val === 'jools@hotmail.com') {
      currentScreen = 2
      $('.intro-form-introduce-email').addClass('hide')
      $('.intro-form-introduce-email-autocomplete').addClass('hide')
      $('.intro-form-to').removeClass('hide')
      $('.intro-form-to input').focus()
    } else if (val === 'June Tally junet@hotmail.com') {
    }
  })
})
