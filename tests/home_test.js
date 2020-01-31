import { Selector } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'
import { loginUrl, expectPathToEql, rootUrl } from './utils/urls'
import {
  userWithIntrosRole,
  deletingUser,
  loginUser,
  userWithNoIntrosRole,
} from './utils/users'

fixture('Home').page(loginUrl)

const button = ReactSelector('StyledButton').withText('Make an intro')

test('When not logged in, it displays a button to sign up a user', async () => {
  await expectPathToEql('/login')
})

test('deleting user should redirect to /recover', async () => {
  await loginUser(deletingUser)
  await expectPathToEql('/recover')
})

test('When logged in, it displays a button to create new intro', async t => {
  await t
    .useRole(userWithNoIntrosRole)
    .navigateTo(rootUrl)
    .expect(button.exists)
    .ok()
    .expect(Selector('.dashboard').count)
    .eql(0)
})

test('When user has made intros already, it displays the dashboard', async t => {
  const text = Selector('.app-container').textContent
  await t
    .useRole(userWithIntrosRole)
    .expect(text)
    .contains('Overview')
    .expect(text)
    .contains('Intros needing confirmation')
    .expect(text)
    .contains('Intros awaiting a reply')
    .expect(text)
    .contains('People connected')
    .expect(text)
    .contains('Recent Intros')
    .expect(text)
    .contains('Latest Activity')
})

test('When user clicks on logout, it logs out the user', async t => {
  await t
    .useRole(userWithIntrosRole)
    .click('nav .dropdown-toggle')
    .click('a[href="/logout"]')

  await expectPathToEql('/login')
})
