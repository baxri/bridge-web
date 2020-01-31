import { Selector, ClientFunction, t } from 'testcafe'
import { waitForReact, ReactSelector } from 'testcafe-react-selectors'
import faker from 'faker'
import { contactsUrl } from './utils/urls'
import { loginUser, userWithIntros, logoutUser } from './utils/users'
import { contactWithNoIntro } from './utils/contacts'

const overwriteCopyCommand = ClientFunction(() => {
  document.execCommand = command => (window.lastExecutedCommand = command)
})
const getLastExecutedCommand = ClientFunction(() => window.lastExecutedCommand)

const Clipboard = ReactSelector('CopyToClipboard')
const page = ReactSelector('ConfirmWrapper')
const field = label => {
  return page.findReact('Field').withProps({ label })
}
const typeAndError = async (label, error) => {
  await t
    .typeText(field(label), 'a')
    .click(field(label))
    .pressKey('ctrl+a delete')
    .pressKey('tab')
    .expect(ReactSelector('FieldMessage').withProps({ error }))
    .ok()
}

fixture('Introduction Link')
  .page(`${contactsUrl}/${contactWithNoIntro.id}`)
  .beforeEach(async () => {
    await waitForReact()
  })

test('when go to contact page, can see intro link button and copy', async t => {
  await loginUser(userWithIntros)
  await t.expect(ReactSelector('ShareButton').count).eql(1)
  await overwriteCopyCommand()
  await t
    .click(Clipboard)
    .expect(getLastExecutedCommand())
    .eql('copy')
})

test('create intro from intro link', async t => {
  await loginUser(userWithIntros)
  await t
    .expect(Clipboard.count)
    .eql(1)
    .setNativeDialogHandler(() => true)
    .click(Clipboard)
  const url = await Clipboard.getReact(({ props }) => props.text)
  await logoutUser()
  await t
    .navigateTo(url)
    .expect(ReactSelector('Header').withProps({ title: 'Create Forwardable' }))
    .ok()
    // .expect(ReactSelector("ActionButton").length).eql(2)
    .expect(ReactSelector('ActionButton').withProps({ disabled: true }))
    .ok()
  await t
    .typeText(field(`Why would you like an intro to ${contactWithNoIntro.name.split(' ')[0]}? (Tip - Write this as if you were writing directly to ${contactWithNoIntro.name.split(' ')[0]})`), faker.lorem.sentence(20))
    .typeText(
      field(
        `Tell ${contactWithNoIntro.name.split(' ')[0]} a bit about yourself:`
      ),
      faker.lorem.sentence(20)
    )
    .typeText(field('Your Name:'), 'John Wick')
    .typeText(field('Your Email:'), faker.internet.email())
    .expect(ReactSelector('ActionButton').withProps({ disabled: false }))
    .ok()
    .click(page.findReact('ActionButton'))
  await t
    .expect(ReactSelector('Button').withProps({ children: 'Apply to Join' }))
    .ok()
    .expect(Selector('.thank-you-page').textContent)
    .contains('I will review your message shortly!')
})

test('form validation on forward', async t => {
  await loginUser(userWithIntros)
  await t
    .expect(Clipboard.count)
    .eql(1)
    .setNativeDialogHandler(() => true)
    .click(Clipboard)
  const url = await Clipboard.getReact(({ props }) => props.text)
  await logoutUser()
  await t.navigateTo(url)

  await typeAndError(
    `Why would you like an intro to ${contactWithNoIntro.name.split(' ')[0]}? (Tip - Write this as if you were writing directly to ${contactWithNoIntro.name.split(' ')[0]})`,
    'Please enter a why would you like the intro'
  )
  await typeAndError(
    `Tell ${contactWithNoIntro.name.split(' ')[0]} a bit about yourself:`,
    'Please enter a bit about yourself'
  )
  await typeAndError('Your Name:', 'Please enter a your name')
  await typeAndError('Your Email:', 'Please enter a your email')
})
