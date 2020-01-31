import { Selector } from 'testcafe'
import faker from 'faker'
import { introductionsUrl, expectPathToEql } from './utils/urls'
import {
  loginUser,
  deletingUser,
  userWithIntros,
  userWithConfimedIntro,
} from './utils/users'
import { introToBePublished } from './utils/intros'
import { acceptedIntro } from './utils/intros'

fixture('Publish Intro').page(
  `${introductionsUrl}/${introToBePublished.ids[0]}/publish`
)

const toEmail = Selector('input[name=to_email]')
const button = Selector('#publish-intro-btn')

test('When not logged in, it redirects to login page', async t => {
  await expectPathToEql('/login')
})

test('deleting user should redirect to /recover', async t => {
  await loginUser(deletingUser)
  await expectPathToEql('/recover')
})

test.page(`${introductionsUrl}/1/publish`)(
  'When intro is not found, it displays blank',
  async t => {
    await loginUser(userWithConfimedIntro)
    await t.expect(Selector('.page.intro').exists).notOk()
  }
)

test('When there are invalid fields, it displays an error', async t => {
  await loginUser(userWithConfimedIntro)
  await t
    .click(toEmail)
    .pressKey('ctrl+a delete')
    .click(button)
    .expect(Selector('.error').count)
    .eql(0)
})

// shoing message already confirmed

test.page(`${introductionsUrl}/${introToBePublished.ids[1]}/publish`)(
  'When server returns an error, it displays an error',
  async t => {
    await loginUser(userWithConfimedIntro)
    await t
      .typeText(toEmail, 'invalid email')
      .click(button)
      .expect(Selector('.invalid-feedback').exists)
      .ok()
  }
)

test.page(`${introductionsUrl}/${introToBePublished.ids[2]}/publish`)(
  'When cancel button is clicked, it redirects to home',
  async t => {
    await loginUser(userWithConfimedIntro)
    await t.click(button)
    await expectPathToEql(`/introductions/${introToBePublished.ids[2]}/publish`)
  }
)

test.page(`${introductionsUrl}/${introToBePublished.ids[3]}/publish`)(
  'When all fields are valid, it publishes the intro',
  async t => {
    await loginUser(userWithConfimedIntro)
    await t
      .typeText(toEmail, faker.internet.email(), { replace: true })
      .click(button)
    await t
      .expect(Selector('#introduction-publish-page').textContent)
      .contains('Intro Forwarded')
  }
)

test.page(`${introductionsUrl}/${acceptedIntro.id}/publish`)(
  'When intro is not publishable, it return error message',
  async t => {
    await loginUser(userWithIntros)
    await t
      .expect(Selector('.alert').textContent)
      .contains('Intro has already been completed')
  }
)
