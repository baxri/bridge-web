import { Role, t, Selector } from 'testcafe'
import { loginUrl } from './urls'
import { ReactSelector } from 'testcafe-react-selectors'

export const userWithNoIntros = {
  email: 'user_with_no_intros@test.com',
  password: 'testing',
  first_name: 'No Intros',
  last_name: 'User',
}

export const userWithIntros = {
  email: 'user_with_intros@test.com',
  password: 'testing',
  first_name: 'Has Intros',
  last_name: 'User',
}

export const userWithResetPassword = {
  email: 'user_with_reset_password@test.com',
  reset_password_token: 'reset_password_token',
}

export const userWithConfimedIntro = {
  email: 'user_with_confirmed_intro@test.com',
  password: 'testing',
}

export const userWithToken = {
  email: 'user_with_token@test.com',
  password: 'testing',
}

export const userWithTokenForDeletion = {
  email: 'user_with_token_for_deletion@test.com',
  password: 'testing',
}

export const deletingUser = {
  email: 'deleting_user@test.com',
  password: 'testing',
  deleting: true,
}

export const recoverableUser = {
  email: 'recoverable_user@test.com',
  password: 'testing',
  deleting: true,
}

export const loginUser = async ({ email, password }) => {
  await t
    .typeText('input[name=email]', email)
    .typeText('input[name=password]', password)
    .click('button[type=submit]')
}

export const logoutUser = async () => {
  await t
    .click(ReactSelector('UserName'))
    .click(
      Selector(
        '.ml-auto.navbar-nav > li.dropdown.show.nav-item > div > a:nth-child(3)'
      )
    )
}

const makeRole = user => Role(loginUrl, async () => await loginUser(user))

export const userWithNoIntrosRole = makeRole(userWithNoIntros)
export const userWithIntrosRole = makeRole(userWithIntros)
export const userOnDeleting = makeRole(deletingUser)
