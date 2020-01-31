import { Selector } from 'testcafe'
import { waitForReact, ReactSelector } from 'testcafe-react-selectors'
import faker from 'faker'
import { introductionsUrl, expectPathToEql } from './utils/urls'
import { publishedIntro } from './utils/intros'

const reason = Selector('textarea[name=reason]')
const bio = Selector('textarea[name=bio]')
const linkedin = Selector('input[name=linkedin_profile_url]')
const submit = ReactSelector('ConfirmFormNoAuth ActionButton')

fixture('Disallow Confirm Published Intro').beforeEach(async () => {
  await waitForReact()
})

test.page(
  `${introductionsUrl}/${publishedIntro.id}/confirm?token=${publishedIntro.initialized_token}`
)('Disallow confirm published intro', async t => {
  await t
    .expect(submit.exists)
    .notOk()
    .expect(ReactSelector('ConnectorMessage').innerText)
    .contains(`I’ve passed your information along`)
})
