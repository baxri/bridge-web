import { Selector, ClientFunction } from 'testcafe'
import { waitForReact, ReactSelector } from 'testcafe-react-selectors'
import faker from 'faker'
import { introductionsUrl, expectPathToEql } from './utils/urls'
import { loginUser, deletingUser, userWithIntros } from './utils/users'
import { contact1, contact2 } from './utils/contacts'

fixture('New Introduction')
  .page(`${introductionsUrl}/new`)
  .beforeEach(async () => {
    await waitForReact()
  })

const page = ReactSelector('NewIntroWrapper')

const sendButton = page.findReact('Header ActionButton')

const fromSelector = page
  .findReact('ContactSelector')
  .withProps({ label: 'I want to introduce...' })

const fromSearch = fromSelector
  .findReact('Input')
  .withProps({ placeholder: 'I want to introduce...' })

const toSelector = page.findReact('ContactSelector').withProps({ label: 'To' })

const toSearch = toSelector.findReact('Input').withProps({ placeholder: 'To' })

const firstSuggestion = page.findReact('ContactItem').withKey(0)

const message = page.findReact('Message')

const getLocation = ClientFunction(() => document.location.href)

test('When not logged in, it redirects to login page', async t => {
  await expectPathToEql('/login')
})

test('deleting user should redirect to /recover', async t => {
  await loginUser(deletingUser)
  await expectPathToEql('/recover')
})

test('when from and receiver empty button send disabled', async t => {
  await loginUser(userWithIntros)
  await t.expect(sendButton.getReact(({ props }) => props.disabled)).eql(true)
})

test('create intro with existing contacts', async t => {
  await loginUser(userWithIntros)
  await t
    .typeText(fromSearch, contact1.name)
    .click(firstSuggestion)
    .typeText(toSelector, contact2.name)
    .click(firstSuggestion)
    .setNativeDialogHandler(() => true)
    .click(sendButton)
})

test('When typing in a name, it displays contact suggestions', async t => {
  await loginUser(userWithIntros)
  await t
    .typeText(fromSearch, contact1.name)
    .expect(firstSuggestion.innerText)
    .contains(contact1.name)
    .click(firstSuggestion)
    .typeText(toSearch, contact2.name)
    .expect(firstSuggestion.innerText)
    .contains(contact2.name)
    .click(firstSuggestion)
})

test('when not in contact, it creates new contacts', async t => {
  const firstName = faker.name.firstName()
  const from = `${firstName} ${faker.name.lastName()}`
  const to = `${faker.name.firstName()} ${faker.name.lastName()}`
  const email = faker.internet.email()
  const email2 = faker.internet.email()

  await loginUser(userWithIntros)
  await t
    .typeText(fromSearch, from)
    .pressKey('enter')
    .typeText(
      fromSelector.findReact('Input').withProps({ label: 'Email' }),
      email
    )
    .typeText(toSearch, to)
    .pressKey('enter')
    .typeText(
      toSelector.findReact('Input').withProps({ label: 'Email' }),
      email2
    )
    .expect(message.getReact(({ props }) => props.value))
    .contains(firstName)
    .click(sendButton)

  // Bypass checking google tokens when user has primary token
  await t.navigateTo(`${introductionsUrl}/new`)
  await t
    .typeText(fromSearch, from)
    .expect(firstSuggestion.innerText)
    .contains(from)
})

test('when change flow type, it changes message template', async t => {
  const firstName = faker.name.firstName()
  const from = `${firstName} ${faker.name.lastName()}`
  const to = `${faker.name.firstName()} ${faker.name.lastName()}`
  const email = faker.internet.email()
  const email2 = faker.internet.email()

  await loginUser(userWithIntros)
  await t
    .typeText(fromSearch, from)
    .pressKey('enter')
    .typeText(
      fromSelector.findReact('Input').withProps({ label: 'Email' }),
      email
    )
    .typeText(toSearch, to)
    .pressKey('enter')
    .typeText(
      toSelector.findReact('Input').withProps({ label: 'Email' }),
      email2
    )
    .expect(message.getReact(({ props }) => props.value))
    .contains(firstName)
    .click(ReactSelector('FlowSelectorTrigger'))
    .click(
      ReactSelector('FlowSelectorItem').withProps({ title: 'Fast, No Opt-In' })
    )
    .expect(message.getReact(({ props }) => props.value))
    .contains(firstName + ', meet')
})

test('trim contact value', async t => {
  const fromLinkedin = fromSelector
    .findReact('Input')
    .withProps({ name: 'intro_from__linkedin' })
  const fromEmail = fromSelector
    .findReact('Input')
    .withProps({ name: 'intro_from__email' })

  const toLinkedin = toSelector
    .findReact('Input')
    .withProps({ name: 'intro_to__linkedin' })
  const toEmail = toSelector
    .findReact('Input')
    .withProps({ name: 'intro_to__email' })

  const fromValue = 'https://linkedin.com/in/gordon'
  const toValue = 'https://linkedin.com/in/jesika'

  await loginUser(userWithIntros)
  await t
    .typeText(fromSearch, 'Gordon Ramsay')
    .pressKey('enter')
    .typeText(fromLinkedin, ` ${fromValue}  `)
    .typeText(fromEmail, 'gordon@mailinator.com')
    .expect(fromLinkedin.getReact(({ props }) => props.value))
    .eql(fromValue)

  await t
    .typeText(toSearch, 'Jesika iskandar')
    .pressKey('enter')
    .typeText(toLinkedin, `  ${toValue} `)
    .typeText(toEmail, 'jesika@mailinator.com')
    .expect(toLinkedin.getReact(({ props }) => props.value))
    .eql(toValue)
})
