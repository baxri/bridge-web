import { Selector } from 'testcafe'
import { waitForReact, ReactSelector } from 'testcafe-react-selectors'
import faker from 'faker'
import { introductionsUrl, expectPathToEql } from './utils/urls'
import { introToBeConfirmed } from './utils/intros'

fixture('Confirm Intro')
  .page(
    `${introductionsUrl}/${introToBeConfirmed.id}/confirm?token=${
      introToBeConfirmed.initialized_token
    }`
  )
  .beforeEach(async () => {
    await waitForReact()
  })

const reason = Selector('textarea[name=reason]')
const bio = Selector('textarea[name=bio]')
const submit = ReactSelector('ConfirmFormNoAuth ActionButton')
const snackBar = Selector('.MuiSnackbar-root')

test.page(`${introductionsUrl}/1/confirm?token=invalid`)(
  'When token is invalid, it displays an error',
  async t => {
    await t.expect(Selector('.alert-danger').exists).ok()
  }
)

test('When from is open, send button is disabled', async t => {
  await t.expect(submit.getReact(({ props }) => props.disabled)).eql(true)
})

test.page(
  `${introductionsUrl}/1/confirm?token=${introToBeConfirmed.initialized_token}`
)('When server returns an error, it displays an error', async t => {
  await t
    .typeText(reason, faker.lorem.sentence())
    .typeText(bio, faker.lorem.paragraph())
    .click(submit)
    .expect(snackBar.textContent)
    .contains('Error! Please, try later')
})

test('When all fields are valid, it confirms the intro', async t => {
  await t
    .typeText(reason, faker.lorem.sentence())
    .typeText(bio, faker.lorem.paragraph())
    .click(submit)

  await expectPathToEql('/confirmation-success')
})
