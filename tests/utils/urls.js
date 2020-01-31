import { t, ClientFunction } from 'testcafe'

export const rootUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://intropath.herokuapp.com'
    : 'http://localhost:3001'

export const loginUrl = `${rootUrl}/login`
export const signUpUrl = `${rootUrl}/register`
export const forgotPasswordUrl = `${rootUrl}/forgot-password`
export const resetPasswordUrl = `${rootUrl}/reset-password`
export const introductionsUrl = `${rootUrl}/introductions`
export const contactsUrl = `${rootUrl}/contacts`
export const profileUrl = `${rootUrl}/profile`
export const searchUrl = `${rootUrl}/search`
export const shareUrl = `${rootUrl}/share`
export const acceptShareUrl = `${rootUrl}/shares`
export const connectLinkedIn = `${rootUrl}/connect/linkedin`
export const recoverUrl = `${rootUrl}/recover`

const getWindowLocation = ClientFunction(() => window.location.pathname)

export const expectPathToEql = async path => {
  await t.expect(getWindowLocation()).eql(path)
}
