import { Selector } from 'testcafe'
import faker from 'faker'
import { loginUser, userWithNoIntros, userWithToken } from './utils/users'
import { connectLinkedIn, expectPathToEql } from './utils/urls'

fixture('Connect LinkedIn').page(connectLinkedIn)

test('When not logged in, it redirects to login page', async t => {
  await expectPathToEql('/login')
})

test('When loaded, it displays upload form', async t => {
  await loginUser(userWithNoIntros)
  await t.expect(Selector('.linkedin-upload-form').count).eql(1)
})

// TestCafe failed when XHR return status code 4xx and 5xx
// test('When importing right LinkedIn archive, it shows success notification', async t => {
//   await loginUser(userWithNoIntros)
//   await t.setFilesToUpload(Selector('.linkedin-upload-form input[type=file]', { visibilityCheck: false }), './files/linkedin-import-success.zip')
//     .expect(Selector('.alert.alert-success').exists).ok()
// })

// test('When importing broken LinkedIn archive, it shows error notification', async t => {
//   await loginUser(userWithNoIntros)
//   await t.setFilesToUpload(Selector('.linkedin-upload-form input[type=file]', { visibilityCheck: false }), './files/linkedin-import-error.zip')
//     .expect(Selector('.alert.alert-danger').exists).ok()
// })

test('When importing LinkedIn archive larger then 5mb, it shows error notification', async t => {
  await loginUser(userWithNoIntros)
  await t
    .setFilesToUpload(
      Selector('.linkedin-upload-form input[type=file]', {
        visibilityCheck: false,
      }),
      './files/linkedin-import-5mb-size-error.zip'
    )
    .expect(Selector('.alert.alert-danger').exists)
    .ok()
})
