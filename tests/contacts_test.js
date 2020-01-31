import { Selector } from 'testcafe'
import {
  loginUser,
  deletingUser,
  userWithNoIntros,
  userWithIntros,
} from './utils/users'
import { contactsUrl, expectPathToEql } from './utils/urls'
import {
  contactWithNoIntro,
  contact1,
  contact2,
  contact3,
} from './utils/contacts'

fixture('Contacts').page(contactsUrl)

const contactName = Selector('.contact-name')

test('When not logged in, it redirects to login page', async t => {
  await expectPathToEql('/login')
})

test('deleting user should redirect to /recover', async t => {
  await loginUser(deletingUser)
  await expectPathToEql('/recover')
})

test('When user has not made any intros yet, it displays a message', async t => {
  await loginUser(userWithNoIntros)
  await t
    .expect(Selector('p.table-heading').textContent)
    .contains('Import your contacts')
})

test('When a contact has not been introduced yet, it is not displayed', async t => {
  await loginUser(userWithIntros)
  await t.expect(contactName.withText(contactWithNoIntro.name).exists).notOk()
})

test('When a contact has been introduced, it is displayed', async t => {
  await loginUser(userWithIntros)
  await t
    .expect(contactName.withText(contact1.name).exists)
    .ok()
    .expect(contactName.withText(contact2.name).exists)
    .ok()
    .expect(contactName.withText(contact3.name).exists)
    .ok()
})

test('When a contact is clicked, it goes to contact page', async t => {
  await loginUser(userWithIntros)
  await t.click(contactName.withText(contact1.name))
  await expectPathToEql(`/contacts/${contact1.id}`)
})
