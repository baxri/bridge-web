import { Selector } from 'testcafe'
import { waitForReact, ReactSelector } from 'testcafe-react-selectors'
import faker from 'faker'
import { introductionsUrl } from './utils/urls'
import { introToBeCanceled } from './utils/intros'

fixture('Cancel Intro')
  .page(
    `${introductionsUrl}/${introToBeCanceled.id}/cancel?token=${introToBeCanceled.initialized_token}`
  )
  .beforeEach(async () => {
    await waitForReact()
  })

const confirm = Selector('button').withText('Yes')
const cancel_message = Selector('textarea[name=cancel_message]')
const reason_busy = Selector('button').withText('Busy Right Now')
const reason_other = Selector('button').withText('Other')
const sendMessage = Selector('button').withText('Send')

test.page(
  `${introductionsUrl}/${introToBeCanceled.id}/cancel?token=${introToBeCanceled.initialized_token}`
)('When message is empty, it shows error ', async t => {
  await t.click(confirm)
  await t
    .expect(Selector('p').innerText)
    .contains(`Let Has know why you didn't accept this intro:`)
    .click(reason_other)
    .click(sendMessage)
    .expect(Selector('.invalid-feedback').innerText)
    .contains(`Please enter a message`)
})

test.page(
  `${introductionsUrl}/${introToBeCanceled.id}/cancel?token=${introToBeCanceled.initialized_token}`
)('When all feilds are valid, it cancels the intro', async t => {
  await t.click(confirm)
  await t
    .expect(Selector('p').innerText)
    .contains(`Let Has know why you didn't accept this intro:`)
    .click(reason_busy)
    .typeText(cancel_message, faker.lorem.paragraph())
    .click(sendMessage)
    .expect(Selector('#success-page').exists)
    .ok()
    .expect(ReactSelector('ConnectorMessage').innerText)
    .contains(`I made sure that intro is now declined.`)
})
