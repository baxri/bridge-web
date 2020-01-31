import { Selector } from 'testcafe'
import faker from 'faker'
import { shareUrl, expectPathToEql } from './utils/urls'
import {
  loginUser,
  deletingUser,
  userWithIntros,
  userWithToken,
} from './utils/users'
import { contact1, contact2 } from './utils/contacts'

fixture('Share Network').page(shareUrl)

const inputContact = Selector('input[name=contact]')
const inputContactValues = Selector(
  'label[for=contact] + .react-tagsinput .react-tagsinput-tag__text'
)
const inputEmail = Selector('input[name=contact_email]')
const inputName = Selector('input[name=contact_name]')
const inputMessage = Selector('textarea[name=message]')
const btnShare = Selector('#share-contact')
const error = Selector('.app-has-error')
const subHeading = Selector('.sub-heading')

test('When not logged in, it redirects to login page', async t => {
  await expectPathToEql('/login')
})

test('deleting user should redirect to /recover', async t => {
  await loginUser(deletingUser)
  await expectPathToEql('/recover')
})

test('When share page is shown, it displays a message', async t => {
  await loginUser(userWithIntros)
  await t.expect(Selector('header h1').innerText).contains('Share Network')
})

test('When there are invalid fields, it displays an error', async t => {
  await loginUser(userWithIntros)
  await t
    .click(btnShare)
    .expect(error.count)
    .eql(1)
})

test('When typing in a name, it displays contact suggestions', async t => {
  await loginUser(userWithIntros)
  await t
    .typeText(inputContact, contact1.name)
    .click('.react-autosuggest__suggestion--first')
    .expect(inputContactValues.textContent)
    .eql(contact1.name)
})

test('When typing in an email, it displays contact suggestions', async t => {
  await loginUser(userWithIntros)
  await t
    .typeText(inputContact, contact1.email)
    .click(
      Selector('.react-autosuggest__suggestion--first').withText(contact1.email)
    )
    .expect(inputContactValues.textContent)
    .eql(contact1.name)
})

test('When typing a new name, it displays email field', async t => {
  await loginUser(userWithIntros)
  await t
    .typeText(inputContact, faker.name.firstName())
    .click(btnShare)
    .expect(inputEmail.exists)
    .ok()
})

test('When typing a new email, it displays name field', async t => {
  await loginUser(userWithIntros)
  await t
    .typeText(inputContact, faker.internet.email())
    .click(btnShare)
    .expect(inputName.exists)
    .ok()
})

test('When fields are valid, it shares the network', async t => {
  await loginUser(userWithIntros)
  await t
    .typeText(inputContact, contact1.name)
    .click('.react-autosuggest__suggestion--first')
    .setNativeDialogHandler(() => true)
    .click(btnShare)
    .expect(subHeading.innerText)
    .contains('Nice work :)\nNetwork has been shared.')
})

test('When sharing again to the same contact, it shows a confirmation alert before sharing the network', async t => {
  await loginUser(userWithIntros)
  await t
    .typeText(inputContact, contact1.name)
    .click('.react-autosuggest__suggestion--first')
    .setNativeDialogHandler(() => true)
    .click(btnShare)

  const history = await t.getNativeDialogHistory()
  await t
    .expect(history[0].type)
    .eql('confirm')
    .expect(history[0].text)
    .eql(
      "You've already shared your network with Contact One. Are you sure you want to continue?"
    )

  await t
    .expect(subHeading.innerText)
    .contains('Nice work :)\nNetwork has been shared.')
})

test('When user with token is logged in, it displays the message input and be edited', async t => {
  await loginUser(userWithToken)
  await t
    .expect(inputMessage.value)
    .eql(`Hi,\n\nI want to share my network with you.`)

  await t
    .typeText(inputContact, faker.name.firstName())
    .click(btnShare)
    .typeText(inputEmail, faker.internet.email())
    .typeText(
      inputMessage,
      'Hello,\n\nI want to share my network with you but this is only a test'
    )
    .click(btnShare)

  await t
    .expect(subHeading.innerText)
    .contains('Nice work :)\nNetwork has been shared.')
})
