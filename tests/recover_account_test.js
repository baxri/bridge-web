import { Selector, t } from 'testcafe'
import { loginUrl, recoverUrl, expectPathToEql } from './utils/urls'
import {
  loginUser,
  deletingUser,
  recoverableUser,
  userWithToken,
} from './utils/users'
import { ReactSelector } from 'testcafe-react-selectors'

fixture('Recover Account').page(recoverUrl)

const rollbackButton = ReactSelector('StyledButton').withText(
  'Reopen Your Account'
)

test('When user is not deleting should be redirected to root path', async t => {
  await t.navigateTo(loginUrl)
  await loginUser(userWithToken)
  await expectPathToEql('/')
})

test('When click rollback, it reopen the account', async t => {
  await t.navigateTo(loginUrl)
  await loginUser(recoverableUser)
  await t.click(rollbackButton)
  await expectPathToEql('/')
})
