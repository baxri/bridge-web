import { Selector, t } from 'testcafe'
import { loginUser, deletingUser, userWithIntros } from './utils/users'
import { contactsUrl, expectPathToEql } from './utils/urls'
import { contact1 } from './utils/contacts'
import {
  initializedIntro,
  noReplyIntro,
  confirmedIntro,
  canceledIntro,
  publishedIntro,
  acceptedIntro,
  rejectedIntro,
  completedIntro,
  archivedIntro,
} from './utils/intros'

fixture('Contact').page(`${contactsUrl}/${contact1.id}`)

const introductionItem = Selector('.introduction-item')

const filterIntros = async filter =>
  await t.click(Selector('button').withText(new RegExp(filter)))

const expectIntrosToEql = async expectedIntros => {
  const count = await introductionItem.count
  for (let i = 0; i < count; i++) {
    await t
      .expect(expectedIntros.map(i => i.id))
      .contains(await introductionItem.nth(i).getAttribute('data-intro-id'))
  }
}

test('When not logged in, it redirects to login page', async t => {
  await expectPathToEql('/login')
})

test('deleting user should redirect to /recover', async t => {
  await loginUser(deletingUser)
  await expectPathToEql('/recover')
})

test.page(`${contactsUrl}/1`)(
  'When contact is not found, it displays blank',
  async t => {
    await loginUser(userWithIntros)
    await t.expect(Selector('.page.intro').exists).notOk()
  }
)

test('When All Intros filter is selected, it displays all intros', async t => {
  await loginUser(userWithIntros)
  await filterIntros('Active')
  await expectIntrosToEql([
    initializedIntro,
    noReplyIntro,
    confirmedIntro,
    canceledIntro,
    publishedIntro,
    acceptedIntro,
    rejectedIntro,
    completedIntro,
    archivedIntro,
  ])
})

test('When Confirm Intro filter is selected, it only displays confirmed intros', async t => {
  await loginUser(userWithIntros)
  await filterIntros('To Do')
  await expectIntrosToEql([confirmedIntro])
})

test('When No Reply Intros filter is selected, it only displays no reply intros', async t => {
  await loginUser(userWithIntros)
  await filterIntros('No Reply')
  await expectIntrosToEql([noReplyIntro, archivedIntro])
})

test('When Active Intros filter is selected, it only displays active intros', async t => {
  await loginUser(userWithIntros)
  await filterIntros('Active')
  await expectIntrosToEql([
    initializedIntro,
    confirmedIntro,
    publishedIntro,
    acceptedIntro,
    noReplyIntro,
  ])
})

test('When Completed Intros filter is selected, it only displays completed intros', async t => {
  await loginUser(userWithIntros)
  await filterIntros('Done')
  await expectIntrosToEql([completedIntro])
})

test('When Declined Intros filter is selected, it only displays declined intros', async t => {
  await loginUser(userWithIntros)
  await filterIntros('Declined')
  await expectIntrosToEql([canceledIntro, rejectedIntro])
})

test('When Archived Intros filter is selected, it only displays archived intros', async t => {
  await loginUser(userWithIntros)
  await filterIntros('Archived')
  await expectIntrosToEql([archivedIntro])
})

test('When new intro link is clicked, it goes to contact new intro page', async t => {
  await loginUser(userWithIntros)
  const btn = Selector('.col-lg-10 .dropdown-toggle').nth(0)
  await t.click(btn)
  const menu = Selector('.dropdown-menu.dropdown-menu-right.show a').nth(0)
  await t.click(menu)
  await expectPathToEql(`/introductions/new`)
})
