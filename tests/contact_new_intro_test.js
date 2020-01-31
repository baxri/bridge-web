import { Selector } from 'testcafe'
import { waitForReact, ReactSelector } from 'testcafe-react-selectors'
import { loginUser, deletingUser, userWithIntros } from './utils/users'
import { contactsUrl, expectPathToEql } from './utils/urls'
import { contact1 } from './utils/contacts'

fixture('Contact New Introduction')
  .page(`${contactsUrl}/${contact1.id}`)
  .beforeEach(async () => {
    await waitForReact()
  })

const fromName = ReactSelector('ContactSelector')
  .withProps({ label: 'I want to introduce...' })
  .findReact('ContactTitle')
const toName = ReactSelector('ContactSelector')
  .withProps({ label: 'To' })
  .findReact('ContactTitle')
const btn = Selector('.col-lg-10 .dropdown-toggle')
const menu1 = Selector('.dropdown-menu.dropdown-menu-right.show a').nth(0)
const menu2 = Selector('.dropdown-menu.dropdown-menu-right.show a').nth(1)

test('When not logged in, it redirects to login page', async t => {
  await expectPathToEql('/login')
})

test('deleting user should redirect to /recover', async t => {
  await loginUser(deletingUser)
  await expectPathToEql('/recover')
})

test.page(`${contactsUrl}/1`)(
  'When contact is not found, it displays blank',
  async t => {
    await loginUser(userWithIntros)
    await t.expect(Selector('.page.intro').exists).notOk()
  }
)

test('When new intro from link is clicked, it prefills the from fields on new intro page', async t => {
  await loginUser(userWithIntros)
  await t
    .click(btn)
    .click(menu1)
    .expect(fromName.textContent)
    .contains(contact1.name)
})

test('When new intro to link is clicked, it prefills the to fields on new intro page', async t => {
  await loginUser(userWithIntros)
  await t
    .click(btn)
    .click(menu2)
    .expect(toName.textContent)
    .contains(contact1.name)
})
