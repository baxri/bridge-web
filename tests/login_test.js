import { Selector } from 'testcafe'
import { loginUrl, expectPathToEql } from './utils/urls'
import { userWithNoIntrosRole } from './utils/users'

fixture('Login').page(loginUrl)

const email = Selector('input[name=email]')
const password = Selector('input[name=password]')
const submit = Selector('button[type=submit]')

test('When fields are not filled in, it displays an error', async t => {
  await t
    .click(submit)
    .expect(Selector('.invalid-feedback').count)
    .eql(2)
})

test('When server returns an error, it displays an error', async t => {
  await t
    .typeText(email, 'invalid email')
    .typeText(password, 'password')
    .click(submit)
    .expect(Selector('.alert-danger').exists)
    .ok()
})

test('When all fields are valid, it logs in the user', async t => {
  await t.useRole(userWithNoIntrosRole)
  await expectPathToEql('/')
})
