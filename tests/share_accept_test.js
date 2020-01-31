import { Selector } from 'testcafe'
import faker from 'faker'
import { loginUrl, acceptShareUrl, expectPathToEql } from './utils/urls'
import { loginUser, userWithIntros, userWithNoIntros } from './utils/users'
import {
  shareForLoggedInUser,
  shareForExistingUser,
  shareForNewUser,
  shareForAnotherNewUser,
  shareAlreadyAccepted,
} from './utils/shares'

fixture('Accept Share')

const heading = Selector('.heading')
const subHeading = Selector('.sub-heading')
const inputFirstName = Selector('input[name=firstName]')
const inputLastName = Selector('input[name=lastName]')
const inputEmail = Selector('input[name=email]')
const inputPassword = Selector('input[name=password]')
const submit = Selector('button[type=submit]')
const loginLink = Selector('a.login-link')
const signupLink = Selector('a.signup-link')

test('When logged in, accept share', async t => {
  await t.navigateTo(loginUrl)
  await loginUser(userWithIntros)
  await t.navigateTo(
    acceptShareUrl +
      '/' +
      shareForLoggedInUser.id +
      '/accept?token=' +
      shareForLoggedInUser.token
  )
  await t
    .expect(heading.innerText)
    .contains("You now have access\nto Has Intros's network!")
    .expect(subHeading.innerText)
    .contains(
      '\nInstall the Bridge Chrome extension to start unlocking incredible intros'
    )
})

// test('When not logged in, login to accept share for existing user', async t => {
//   await t.navigateTo(acceptShareUrl + '/' + shareForExistingUser.id + '/accept?token=' + shareForExistingUser.token)
//   await t
//     .expect(subHeading.innerText).contains('Please login to get access\nto Has Intros\'s network!')
//     .expect(inputEmail.value).eql(shareForExistingUser.email)
//   await t
//     .typeText(inputPassword, userWithNoIntros.password)
//     .expect(inputPassword.value).notEql('')
//     .click(submit)
//   await t
//     .expect(heading.innerText).contains('You now have access\nto Has Intros\'s network!')
//     .expect(subHeading.innerText).contains('\nInstall the Bridge Chrome extension to start unlocking incredible intros')
// })

test('When not logged in, sign up to accept share for new user', async t => {
  await t.navigateTo(
    acceptShareUrl +
      '/' +
      shareForNewUser.id +
      '/accept?token=' +
      shareForNewUser.token
  )
  await t
    .expect(subHeading.innerText)
    .contains("Please sign up to get access\nto Has Intros's network!")
    .expect(inputFirstName.value)
    .eql(shareForNewUser.firstName)
    .expect(inputLastName.value)
    .eql(shareForNewUser.lastName)
    .expect(inputEmail.value)
    .eql(shareForNewUser.email)
  await t.typeText(inputPassword, 'testing').click(submit)
  await t
    .expect(heading.innerText)
    .contains("You now have access\nto Has Intros's network!")
    .expect(subHeading.innerText)
    .contains(
      '\nInstall the Bridge Chrome extension to start unlocking incredible intros'
    )
})

test('When not logged in and on accept share screen, toggle between sign up and login forms', async t => {
  await t.navigateTo(
    acceptShareUrl +
      '/' +
      shareForAnotherNewUser.id +
      '/accept?token=' +
      shareForAnotherNewUser.token
  )
  await t
    .expect(subHeading.innerText)
    .contains("Please sign up to get access\nto Has Intros's network!")
    .expect(inputFirstName.value)
    .eql(shareForAnotherNewUser.firstName)
    .expect(inputLastName.value)
    .eql(shareForAnotherNewUser.lastName)
    .expect(inputEmail.value)
    .eql(shareForAnotherNewUser.email)
  await t.click(loginLink)
  await t
    .expect(subHeading.innerText)
    .contains("Please login to get access\nto Has Intros's network!")
    .expect(inputEmail.value)
    .eql(shareForAnotherNewUser.email)
  await t.click(signupLink)
  await t
    .expect(subHeading.innerText)
    .contains("Please sign up to get access\nto Has Intros's network!")
    .expect(inputFirstName.value)
    .eql(shareForAnotherNewUser.firstName)
    .expect(inputLastName.value)
    .eql(shareForAnotherNewUser.lastName)
    .expect(inputEmail.value)
    .eql(shareForAnotherNewUser.email)
})

test('When not logged in and share already accepted', async t => {
  await t.navigateTo(
    acceptShareUrl +
      '/' +
      shareAlreadyAccepted.id +
      '/accept?token=' +
      shareAlreadyAccepted.token
  )
  await t
    .expect(heading.innerText)
    .contains('Network access already accepted!')
    .expect(subHeading.innerText)
    .contains(
      '\nInstall the Bridge Chrome extension to start unlocking incredible intros'
    )
})

test('When logged in and share already accepted', async t => {
  await t.navigateTo(loginUrl)
  await loginUser(userWithIntros)
  await t.navigateTo(
    acceptShareUrl +
      '/' +
      shareAlreadyAccepted.id +
      '/accept?token=' +
      shareAlreadyAccepted.token
  )
  await t
    .expect(heading.innerText)
    .contains('Network access already accepted!')
    .expect(subHeading.innerText)
    .contains(
      '\nInstall the Bridge Chrome extension to start unlocking incredible intros'
    )
})
