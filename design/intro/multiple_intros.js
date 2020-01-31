$(document).ready(function() {
  var labels = {
    introduce: $('.introduce-input label').html(),
    introduceEmail: $('.introduce-email-input label').html(),
    to: $('.to-input label').html(),
    toEmail: $('.to-email-input label').html(),
  }

  var placeholders = {
    introduce: $('.introduce-input input').attr('placeholder'),
    introduceEmail: $('.introduce-email-input input').attr('placeholder'),
    to: $('.to-input input').attr('placeholder'),
    toEmail: $('.to-email-input input').attr('placeholder'),
  }

  var startIntro = function() {
    $('.intro-start').addClass('hide')

    $('.introduce-input input').val('')
    $('.introduce-email-input input').val('')
    $('.to-input input').val('')
    $('.to-email-input input').val('')

    $('.introduce-email-input').addClass('hide')
    // $('.to-input').addClass('hide');
    $('.to-email-input').addClass('hide')

    $('.intro-heading').removeClass('hide')
    $('.intro-form').removeClass('hide')

    $('#introduce').focus()
  }

  var submitIntro = function() {
    var introduceFullName = $('.introduce-input input').val()
    var introduceFirstName = introduceFullName.split(' ')[0]
    var introduceEmail = $('.introduce-email-input input').val()
    var toFullName = $('.to-input input').val()
    var toEmail = $('.to-email-input input').val()

    if (
      !introduceFullName.length ||
      !introduceEmail.length ||
      !toFullName.length ||
      !toEmail.length
    ) {
      return false
    }

    var previewHtml = 'TO: ' + introduceEmail + '<br/><br/>'
    previewHtml += 'Hi ' + introduceFirstName + ',<br/><br/>'
    previewHtml +=
      'Just following up to make sure you want that intro to ' +
      toFullName +
      '?<br/><br/>'
    previewHtml +=
      '<span class="link">Yes I Do</span> --- <span class="link">No Thanks</span><br/><br/>'
    previewHtml += 'Cheers,<br/>'
    previewHtml += "[replace with logged in user's first name]"

    $('.intro-preview-form span').html(previewHtml)

    $('.intro-form').addClass('hide')
    $('.intro-preview-form').removeClass('hide')

    return false
  }

  var sendIntro = function() {
    $('.intro-heading').addClass('hide')
    $('.intro-preview-form').addClass('hide')
    $('.intro-confirm').removeClass('hide')
  }

  var doneIntro = function() {
    $('.intro-confirm').addClass('hide')
    $('.intro-start').removeClass('hide')
  }

  $('.btn-intro-start').on('click', function(e) {
    e.preventDefault()
    startIntro()
  })

  $('.intro-form').on('submit', function(e) {
    e.preventDefault()
    submitIntro()
  })
  $('.preview-form').on('submit', function(e) {
    e.preventDefault()
  })
  $('.btn-send-intro').on('click', function(e) {
    e.preventDefault()
    sendIntro()
  })
  $('.btn-cancel').on('click', function(e) {
    e.preventDefault()
    $('.intro-preview-form').addClass('hide')
    $('.intro-form').removeClass('hide')
  })

  $('.btn-done').on('click', function(e) {
    e.preventDefault()
    doneIntro()
  })

  var refreshInputs = function() {
    var introduceEmailLabel = labels.introduceEmail
    var toLabel = labels.to
    var toEmailLabel = labels.toEmail

    var introduceEmailPlaceholder = placeholders.introduceEmail
    var toPlaceholder = placeholders.to
    var toEmailPlaceholder = placeholders.toEmail

    var introduceFullName = $('.introduce-input input').val()
    if (introduceFullName.length) {
      var introduceFirstName = introduceFullName.split(' ')[0].trim()
      introduceEmailLabel = 'What is ' + introduceFirstName + "'s email?"
      introduceEmailPlaceholder = introduceFirstName + "'s Email"
      toLabel = 'Who are you introducing to ' + introduceFirstName + '?'

      // $('.introduce-email-input').removeClass('hide');
      $('.to-input').removeClass('hide')
    }
    $('.introduce-email-input label').html(introduceEmailLabel)
    $('.introduce-email-input input').attr(
      'placeholder',
      introduceEmailPlaceholder
    )
    // $('.to-input label').html(toLabel);

    var toFullName = $('.to-input input').val()
    if (toFullName.length) {
      var toFirstName = toFullName.split(' ')[0].trim()
      toEmailLabel = 'What is ' + toFirstName + "'s email?"
      toEmailPlaceholder = toFirstName + "'s Email"

      // $('.to-email-input').removeClass('hide');
      $('.intro-form button').removeClass('hide')
    }
    // $('.to-email-input label').html(toEmailLabel);
    $('.to-email-input input').attr('placeholder', toEmailPlaceholder)
  }

  $('input').on('change', function() {
    refreshInputs()
  })
  $('input').on('keyup', function(e) {
    refreshInputs()

    if (e.which == 13 && $('.intro-form button').css('display') != 'block') {
      var inputs = $(this)
        .closest('form')
        .find('input')
      inputs.eq(inputs.index(this) + 1).focus()
    }
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

  $(document).keypress(function(e) {
    if (e.which == 13) {
      if ($('.intro-start button').is(':visible')) {
        startIntro()
      } else if ($('.intro-form button').is(':visible')) {
        submitIntro()
      } else if ($('.intro-preview-form .btn-send-intro').is(':visible')) {
        sendIntro()
      } else if ($('.intro-confirm button').is(':visible')) {
        doneIntro()
      }
    }
  })

  $('#introduce').focus()

  // Autocomplete email

  var REGEX_EMAIL =
    "([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@" +
    '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)'

  $('#select-intro').selectize({
    persist: false,
    maxItems: null,
    valueField: 'email',
    labelField: 'name',
    searchField: ['name', 'email'],
    options: [
      { email: 'chico.charlesworth@gmail.com', name: 'Chico Charlesworth' },
      { email: 'brian@thirdroute.com', name: 'Brian Reavis' },
      { email: 'nikola@tesla.com', name: 'Nikola Tesla' },
      { email: 'someone@gmail.com' },
    ],
    openOnFocus: false,
    closeAfterSelect: true,
    render: {
      item: function(item, escape) {
        console.log('Render item')
        if (item.name) {
          return (
            '<div>' +
            (item.name
              ? '<span class="name">' + escape(item.name) + '</span>'
              : '')
          )
          ;('</div>')
        } else {
          return (
            '<div>' +
            (item.email
              ? '<span class="email">' + escape(item.email) + '</span>'
              : '') +
            '</div>'
          )
        }
      },
      option: function(item, escape) {
        var label = item.name || item.email
        var caption = item.name ? item.email : null
        return (
          '<div>' +
          '<span class="label">' +
          escape(label) +
          '</span>' +
          (caption
            ? '<span class="caption">' + escape(caption) + '</span>'
            : '') +
          '</div>'
        )
      },
    },
    createFilter: function(input) {
      var match, regex

      // email@address.com
      regex = new RegExp('^' + REGEX_EMAIL + '$', 'i')
      match = input.match(regex)
      if (match) return !this.options.hasOwnProperty(match[0])

      // name <email@address.com>
      regex = new RegExp('^([^<]*)<' + REGEX_EMAIL + '>$', 'i')
      match = input.match(regex)
      if (match) return !this.options.hasOwnProperty(match[2])

      console.log('createFilter true')
      return true
    },
    create: function(input) {
      console.log('create ' + input)
      if (new RegExp('^' + REGEX_EMAIL + '$', 'i').test(input)) {
        return { email: input }
      }
      var match = input.match(new RegExp('^([^<]*)<' + REGEX_EMAIL + '>$', 'i'))
      if (match) {
        return {
          email: match[2],
          name: $.trim(match[1]),
        }
      }
      console.log('create name: ' + input)
      return {
        email: input,
      }
    },
  })

  $('#select-to').selectize({
    persist: false,
    maxItems: null,
    valueField: 'email',
    labelField: 'name',
    searchField: ['name', 'email'],
    options: [
      { email: 'chico.charlesworth@gmail.com', name: 'Chico Charlesworth' },
      { email: 'brian@thirdroute.com', name: 'Brian Reavis' },
      { email: 'nikola@tesla.com', name: 'Nikola Tesla' },
      { email: 'someone@gmail.com' },
    ],
    openOnFocus: false,
    closeAfterSelect: true,
    render: {
      item: function(item, escape) {
        console.log('Render item')
        if (item.name) {
          return (
            '<div>' +
            (item.name
              ? '<span class="name">' + escape(item.name) + '</span>'
              : '')
          )
          ;('</div>')
        } else {
          return (
            '<div>' +
            (item.email
              ? '<span class="email">' + escape(item.email) + '</span>'
              : '') +
            '</div>'
          )
        }
      },
      option: function(item, escape) {
        var label = item.name || item.email
        var caption = item.name ? item.email : null
        return (
          '<div>' +
          '<span class="label">' +
          escape(label) +
          '</span>' +
          (caption
            ? '<span class="caption">' + escape(caption) + '</span>'
            : '') +
          '</div>'
        )
      },
    },
    createFilter: function(input) {
      var match, regex

      // email@address.com
      regex = new RegExp('^' + REGEX_EMAIL + '$', 'i')
      match = input.match(regex)
      if (match) return !this.options.hasOwnProperty(match[0])

      // name <email@address.com>
      regex = new RegExp('^([^<]*)<' + REGEX_EMAIL + '>$', 'i')
      match = input.match(regex)
      if (match) return !this.options.hasOwnProperty(match[2])

      console.log('createFilter true')
      return true
    },
    create: function(input) {
      console.log('create ' + input)
      if (new RegExp('^' + REGEX_EMAIL + '$', 'i').test(input)) {
        return { email: input }
      }
      var match = input.match(new RegExp('^([^<]*)<' + REGEX_EMAIL + '>$', 'i'))
      if (match) {
        return {
          email: match[2],
          name: $.trim(match[1]),
        }
      }
      console.log('create name: ' + input)
      return {
        email: input,
      }
    },
  })
})
