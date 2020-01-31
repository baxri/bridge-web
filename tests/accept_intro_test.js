import { Selector } from 'testcafe'
import { waitForReact, ReactSelector } from 'testcafe-react-selectors'
import { introductionsUrl } from './utils/urls'
import { introToBeAccepted } from './utils/intros'

fixture('Accept Intro').beforeEach(async () => {
  await waitForReact()
})

test.page(
  `${introductionsUrl}/1/accept?token=${introToBeAccepted.published_token}`
)('When server returns an error, it displays an error', async t => {
  // await t.expect(Selector('.error-message').exists).ok()
  await t
    .expect(Selector('#success-page').exists)
    .ok()
    .expect(ReactSelector('ConnectorMessage').innerText)
    .contains(`Record not found!`)
})

test.page(
  `${introductionsUrl}/${introToBeAccepted.id}/accept?token=${
    introToBeAccepted.published_token
  }`
)('When valid, it accepts the intro', async t => {
  await t
    .expect(Selector('#success-page').exists)
    .ok()
    .expect(ReactSelector('ConnectorMessage').innerText)
    .contains(`I just connected you both!`)
})
