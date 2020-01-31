import { Selector } from 'testcafe'
import faker from 'faker'
import { signUpUrl, expectPathToEql } from './utils/urls'
import { userWithNoIntros } from './utils/users'

fixture('Sign Up').page(signUpUrl + '?invite=true')

const firstName = Selector('input[name=firstName]')
const lastName = Selector('input[name=lastName]')
const email = Selector('input[name=email]')
const password = Selector('input[name=password]')
const submit = Selector('button[type=submit]')

test('When fields are not filled in, it displays an error', async t => {
  await t
    .click(submit)
    .expect(Selector('.invalid-feedback').count)
    .eql(4)
})

test('When server returns an error, it displays an error', async t => {
  await t
    .typeText(firstName, faker.name.firstName())
    .typeText(lastName, faker.name.lastName())
    .typeText(email, 'invalid email')
    .typeText(password, 'pass')
    .click(submit)
    .expect(Selector('.alert-danger').exists)
    .ok()
})

test('When signing up a user with an email that is taken already, it displays an error', async t => {
  await t
    .typeText(firstName, faker.name.firstName())
    .typeText(lastName, faker.name.lastName())
    .typeText(email, userWithNoIntros.email.toUpperCase())
    .typeText(password, faker.internet.password())
    .click(submit)
    .expect(Selector('.alert-danger').exists)
    .ok()
})

test('When all fields are valid, it signs up the user', async t => {
  await t
    .typeText(firstName, faker.name.firstName())
    .typeText(lastName, faker.name.lastName())
    .typeText(email, faker.internet.email())
    .typeText(password, faker.internet.password())
    .click(submit)

  await expectPathToEql('/')
})

test.page(signUpUrl)('When no invite', async t => {
  await t.expect(Selector('body').textContent).contains('to get an invite')
})
