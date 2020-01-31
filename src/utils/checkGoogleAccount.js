import { checkPrimaryToken } from 'intropath-core/actions/user'

/**
 * When users have primary Google account, makes sure it still working.
 * Ohterwise, bring them to Google Sync screen
 */
export function checkUserTokens(tokens, history, goTo, goToOnClose, callback) {
  //Need this for quicker testing purposes
  if (process.env.REACT_APP_ALLOW_SEND_WITHOUT_TOKENS) {
    if (callback) {
      callback()
    } else {
      history.push(goTo)
    }
    return
  }

  let importContactURL = '/import-contacts'
  importContactURL += `?redirectAfter=${encodeURIComponent(goTo)}`
  if (goToOnClose) {
    importContactURL += `&redirectOnClose=${encodeURIComponent(goToOnClose)}`
  }

  if (tokens && tokens.length > 0) {
    const primary = getPrimaryToken(tokens)
    if (primary) {
      checkPrimaryToken(primary.id)
        .then(res => {
          if (callback) {
            callback()
          } else {
            history.push(goTo)
          }
        })
        .catch(err => {
          console.log(err)

          const { response } = err
          const data = (response && response.data) || {}
          if (data.error === 'Invalid token') {
            history.push(`${importContactURL}&tokenIsIvalid=1`)
          } else {
            if (callback) {
              callback()
            } else {
              history.push(goTo)
            }
          }
        })
    } else {
      if (callback) {
        callback()
      } else {
        history.push(goTo)
      }
    }
  } else {
    history.push(`${importContactURL}&tokenIsIvalid=0`)
  }
}

/**
 * Gets the primary Google account of current user
 *
 * If user have only one account, return this one.
 * Otherwise, return the account which is `is_primary` is true
 *
 * @param {Array} tokens The list of Google account
 */
function getPrimaryToken(tokens) {
  if (tokens.length === 1) {
    return tokens[0]
  }

  return tokens.find(token => token.is_primary)
}
