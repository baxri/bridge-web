import { Selector } from 'testcafe'
import { waitForReact, ReactSelector } from 'testcafe-react-selectors'
import faker from 'faker'
import { introductionsUrl, expectPathToEql } from './utils/urls'
import { introToBeReconfirmed } from './utils/intros'

const reason = Selector('textarea[name=reason]')
const bio = Selector('textarea[name=bio]')
const linkedin = Selector('input[name=linkedin_profile_url]')
const submit = ReactSelector('ConfirmFormNoAuth ActionButton')

fixture('Confirm Intro Again').beforeEach(async () => {
  await waitForReact()
})

test.page(
  `${introductionsUrl}/${introToBeReconfirmed.id}/confirm?token=${introToBeReconfirmed.initialized_token}`
)('Confirm and reconfirm intro', async t => {
  // Confirm with initial data
  const initialData = {
    reason: faker.lorem.sentence(),
    bio: faker.lorem.sentence(),
    linkedin: 'http://linkedin.com/in/initial',
  }
  await t
    .typeText(reason, initialData.reason)
    .typeText(bio, initialData.bio)
    .typeText(linkedin, initialData.linkedin)
    .click(submit)

  await expectPathToEql('/confirmation-success')

  await t
    .expect(ReactSelector('ConnectorMessage').innerText)
    .contains(`I will review your message shortly!`)

  // Reconfirm with updated data
  const updatedData = {
    reason: faker.lorem.sentence(),
    bio: faker.lorem.sentence(),
    linkedin: 'http://linkedin.com/in/updated',
  }
  await t
    .click(Selector('#make-intro-changes-link'))
    .expect(reason.value)
    .contains(initialData.reason)
    .expect(bio.value)
    .contains(initialData.bio)
    .expect(linkedin.value)
    .contains(initialData.linkedin)
    .typeText(reason, updatedData.reason)
    .typeText(bio, updatedData.bio)
    .typeText(linkedin, updatedData.linkedin)
    .click(submit)

  await expectPathToEql('/confirmation-success')

  // Check updated data is pre-populated when making changes again
  await t
    .click(Selector('#make-intro-changes-link'))
    .expect(reason.value)
    .contains(updatedData.reason)
    .expect(bio.value)
    .contains(updatedData.bio)
    .expect(linkedin.value)
    .contains(updatedData.linkedin)
})
