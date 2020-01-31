import { isEmail } from 'validator'
import { linkedinRegex } from 'utils/validation'

export const validateContact = (contact, opts = {}) => {
  const errors = {}
  if (!contact.name) {
    errors.name = 'Required'
    errors.hasErrors = true
  }

  if (!contact.email) {
    errors.email = 'Required'
    errors.hasErrors = true
  }

  if (contact.email && !isEmail(contact.email)) {
    errors.email = 'Invalid'
    errors.hasErrors = true
  }

  if (contact.linkedin_profile_url) {
    if (!linkedinRegex.test(contact.linkedin_profile_url)) {
      errors.linkedin_profile_url = 'Invalid LinkedIn URL'
      errors.hasErrors = true
    }
  }

  if (
    opts.contactConnector &&
    opts.contactConnector.email &&
    contact &&
    contact.email &&
    contact.email.toLowerCase() === opts.contactConnector.email.toLowerCase()
  ) {
    errors.email = 'Email should be different'
    errors.hasErrors = true
  }

  return errors
}
