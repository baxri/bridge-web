$(document).ready(function() {
  var delay = 1000

  var total = 1752
  var count = [500, 1000, 1500, total]

  $('.progress-bar')
    .animate(
      {
        width: (count[0] * 100) / total + '%',
      },
      delay
    )
    .delay(delay)
    .animate(
      {
        width: (count[1] * 100) / total + '%',
      },
      delay
    )
    .delay(delay)
    .animate(
      {
        width: (count[2] * 100) / total + '%',
      },
      delay
    )
    .delay(delay)
    .animate(
      {
        width: (count[3] * 100) / total + '%',
      },
      delay
    )

  var next = 0
  var updateCount = function() {
    if (next >= count.length) {
      return
    }
    $('#count').text(count[next])
    next++
    setTimeout(updateCount, delay * 2)
  }
  setTimeout(updateCount, delay)
})
