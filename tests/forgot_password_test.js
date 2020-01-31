import { Selector } from 'testcafe'
import { forgotPasswordUrl } from './utils/urls'
import { userWithNoIntros } from './utils/users'

fixture('Forgot Password').page(forgotPasswordUrl)

const email = Selector('input[name=email]')
const submit = Selector('button[type=submit]')

test('When server returns an error, it displays an error', async t => {
  await t
    .typeText(email, 'invalid email')
    .click(submit)
    .expect(Selector('.alert-danger').exists)
    .ok()
})

test('When valid email is entered, it displays a success message', async t => {
  await t
    .typeText(email, userWithNoIntros.email)
    .click(submit)
    .expect(Selector('.alert-success').exists)
    .ok()
})
