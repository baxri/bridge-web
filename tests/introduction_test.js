import { Selector } from 'testcafe'
import { introductionsUrl, expectPathToEql } from './utils/urls'
import { loginUser, userWithIntros, deletingUser } from './utils/users'
import { initializedIntro } from './utils/intros'

fixture('Introduction').page(`${introductionsUrl}/${initializedIntro.id}`)

test('When not logged in, it redirects to login page', async t => {
  await expectPathToEql('/login')
})

test('deleting user should redirect to /recover', async t => {
  await loginUser(deletingUser)
  await expectPathToEql('/recover')
})

test.page(`${introductionsUrl}/1`)(
  'When intro is not found, it displays blank',
  async t => {
    await loginUser(userWithIntros)
    await t.expect(Selector('#introduction-page').exists).notOk()
  }
)

test('WHen intro is found, it displays intro detail', async t => {
  await loginUser(userWithIntros)
  await t.expect(Selector('#introduction-page').exists).ok()
})
