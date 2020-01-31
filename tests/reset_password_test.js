import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'
import { resetPasswordUrl, expectPathToEql } from './utils/urls'
import { userWithResetPassword } from './utils/users'

fixture('Reset Password').page(
  `${resetPasswordUrl}?token=${userWithResetPassword.reset_password_token}`
)

const password = ReactSelector('Field').withProps({ name: 'password' })
const passwordConfirm = ReactSelector('Field').withProps({
  name: 'passwordConfirm',
})
const submit = ReactSelector('Button')
const flash = ReactSelector('Flash')

test('When there are invalid fields, it displays an error', async t => {
  await t
    .click(submit)
    .expect(Selector('.invalid-feedback').count)
    .eql(2)
})

test('When server returns an error, it displays an error', async t => {
  await t
    .typeText(password, 'short')
    .typeText(passwordConfirm, 'short')
    .click(submit)
    .expect(flash.textContent)
    .contains('Password is too short')
})

test('When successful, it redirects to login page', async t => {
  await t
    .typeText(password, 'valid password')
    .typeText(passwordConfirm, 'valid password')
    .click(submit)

  await expectPathToEql('/login')
})

test.page(`${resetPasswordUrl}?token=abcdkjka`)('invalid link', async t => {
  await t
    .expect(Selector('.app-container').textContent)
    .contains(
      'The reset password link has expired or is no longer valid, to reset it again please click here.'
    )
})
