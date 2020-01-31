function getInternetExplorerVersion() {
  var rv = -1
  if (navigator.appName == 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent
    var re = new RegExp('MSIE ([0-9]{1,}[\\.0-9]{0,})')
    if (re.exec(ua) != null) rv = parseFloat(RegExp.$1)
  } else if (navigator.appName == 'Netscape') {
    var ua = navigator.userAgent
    var re = new RegExp('Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})')
    if (re.exec(ua) != null) rv = parseFloat(RegExp.$1)
  }
  return rv
}

var ieV = getInternetExplorerVersion()
if (ieV < 18 && ieV > 0) {
  document.write(
    '<div style="font-family: Rubik, sans-serif; font-size: 24px; text-align: center;">' +
      'Unfortunately, Bridge is not compatible with Internet Explorer.<br/><br/>' +
      '<small>To continue, please open the link below in Chrome, Firefox or Microsoft Edge.<br/>' +
      'You can also proceed using your smartphone.</small><br/><br/>' +
      '<small>Link:<br/><a href="#" id="safe-link"></a></small><br/><br/>' +
      '<small><small>Many apologies for the inconvenience.</small></small>' +
      '</div>'
  )

  // populating link by DOM API to avoid script injection vulnerability
  document.getElementById('safe-link').href = location.href
  document
    .getElementById('safe-link')
    .appendChild(document.createTextNode(location.href))

  // stop executing all other scripts
  document.execCommand('Stop')
  window.stop()
}
