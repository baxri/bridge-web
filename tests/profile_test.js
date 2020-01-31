import { Selector } from 'testcafe'
import { ReactSelector, waitForReact } from 'testcafe-react-selectors'
import faker from 'faker'
import {
  loginUser,
  recoverableUser,
  deletingUser,
  userWithNoIntros,
  userWithTokenForDeletion,
} from './utils/users'
import { profileUrl, expectPathToEql } from './utils/urls'

fixture('Profile')
  .page(profileUrl)
  .beforeEach(async () => {
    await waitForReact()
  })

const firstName = Selector('input[name=first_name]')
const lastName = Selector('input[name=last_name]')
const submit = Selector('button[type=submit]')
const deleteButton = ReactSelector('StyledButton').withText('Delete Account')

test('When not logged in, it redirects to login page', async t => {
  await expectPathToEql('/login')
})

test('deleting user should redirect to /recover', async t => {
  await loginUser(deletingUser)
  await expectPathToEql('/recover')
})

test('When account deleted, it redirects to recover page', async t => {
  await loginUser(recoverableUser)
  await t
    .setNativeDialogHandler(() => true)
    .click(ReactSelector('StyledButton').withText('Reopen Your Account'))
    .navigateTo(profileUrl)
    .click(deleteButton)
  await expectPathToEql('/recover')
})

test('When loaded, it displays the name of the user', async t => {
  await loginUser(userWithNoIntros)
  await t
    .expect(firstName.value)
    .eql(userWithNoIntros.first_name)
    .expect(lastName.value)
    .eql(userWithNoIntros.last_name)
})

test('When there are invalid fields, it displays an error', async t => {
  await loginUser(userWithNoIntros)
  await t
    .click(firstName)
    .pressKey('ctrl+a delete')
    .click(lastName)
    .pressKey('ctrl+a delete')
    .click(submit)
    .expect(Selector('.invalid-feedback').count)
    .eql(2)
})

test("When all fields are valid, it updates the user's name", async t => {
  await loginUser(userWithNoIntros)
  await t
    .typeText(firstName, faker.name.firstName(), { replace: true })
    .typeText(lastName, faker.name.lastName(), { replace: true })
    .click(submit)
    .expect(Selector('.alert-success').exists)
    .ok()
})

test('When connect gmail is clicked, it redirects to import contacts page', async t => {
  await loginUser(userWithNoIntros)
  await t.click(ReactSelector('StyledButton').withText('Connect'))
  await expectPathToEql('/import-contacts')
})

test('When disconnect gmail is clicked, it disconnects gmail', async t => {
  await loginUser(userWithTokenForDeletion)
  await t
    .setNativeDialogHandler(() => true)
    .click(ReactSelector('ButtonLink').withText('Remove'))
    .expect(Selector('.gmail-account-row').exists)
    .notOk()
})

// test('When import LinkedIn contacts clicked, it redirects to import page', async t => {
//   await loginUser(userWithNoIntros)
//   await t.click('.import-linkedin')
//   await expectPathToEql('/connect/linkedin')
// })
