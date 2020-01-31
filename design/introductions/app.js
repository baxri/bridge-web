$(document).ready(function() {
  $('.back-btn').on('click', function(e) {
    e.preventDefault()
    window.location.href = './index.html'
  })

  $('.introductions div:first-child').on('click', function(e) {
    e.preventDefault()
    window.location.href = './intro.html'
  })
})
