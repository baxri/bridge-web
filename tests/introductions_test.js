import { Selector, t } from 'testcafe'
import { introductionsUrl, expectPathToEql } from './utils/urls'
import { loginUser, deletingUser, userWithIntros } from './utils/users'
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
import { ReactSelector } from 'testcafe-react-selectors'

fixture('Introductions').page(introductionsUrl)

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

// test('When introduction row is clicked, it goes to intro detail page', async t => {
//   await loginUser(userWithIntros)
//   const row = Selector('.col-lg-10 a').nth(1)
//   await t.click(row)
//   await expectPathToEql(`/introductions/${initializedIntro.id}`)
// })

// TODO: Improve test case with button click go to create new intro page
test('When logged in, it displays a button to create new intro', async t => {
  await loginUser(userWithIntros)
  const btn = ReactSelector('StyledButton').withText('Make an intro')
  await t.expect(btn.exists).ok()
})

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

//test('When an intro is initialized, it displays a resend email button', async t => {
//  const button = Selector(`[data-intro-id="${initializedIntro.id}"] .send-email-btn`)

//  await loginUser(userWithIntros)
//  await t
//   .click(button)
//   .expect(button.innerText).contains('EMAIL SENT')
// })

// test('When an intro is canceled or rejected, it displays a rejected label', async t => {
//   await loginUser(userWithIntros)
//   await t
//     .expect(Selector(`[data-intro-id="${canceledIntro.id}"] .label-rejected`).exists).ok()
//     .expect(Selector(`[data-intro-id="${rejectedIntro.id}"] .label-rejected`).exists).ok()
// })

// test('When an intro is confirmed, it displays a confirm intro button', async t => {
//   const button = Selector(`[data-intro-id="${confirmedIntro.id}"] .confirm-intro-btn`)

//   await loginUser(userWithIntros)
//   await t.click(button)
//   await expectPathToEql(`/introductions/${confirmedIntro.id}/publish`)
// })

// test('When an intro is published, it displays a reconfirm intro button', async t => {
//   const button = Selector(`[data-intro-id="${publishedIntro.id}"] .confirm-intro-btn`)

//   await loginUser(userWithIntros)
//   await t.click(button)
//   await expectPathToEql(`/introductions/${publishedIntro.id}/publish`)
// })

// test('When an intro is completed, it displays a completed tag', async t => {
//   await loginUser(userWithIntros)
//   await t.expect(Selector(`[data-intro-id="${completedIntro.id}"] .label-completed`).exists).ok()
// })
