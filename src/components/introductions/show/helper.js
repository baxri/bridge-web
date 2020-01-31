// TODO Move to intropath core library

import React from 'react'
import { sortBy, lowerCase } from 'lodash'
import styled from 'styled-components'
import Linkify from 'react-linkify'
import extractFirstName from 'utils/extractFirstName'

const LinkedinLink = styled.a`
  margin-top: 10px;
`

export function isIntroDone(intro) {
  return (
    intro.status === 'accepted' ||
    intro.status === 'rejected' ||
    intro.status === 'canceled_by_owner'
  )
}

export function humanizeRating(rating) {
  return lowerCase(rating)
}

export function humanizeReason(cancelation_reason) {
  return {
    not_relevant: 'Not a Fit',
    i_do_not_have_time: 'Busy Right Now',
    we_are_already_connected: 'Already Connected',
    other: 'Other',
  }[cancelation_reason]
}

function orderAndSanitizeIntroMessages(intro) {
  let messages = sortBy(intro.messages.filter(m => m.sent_at), 'sent_at')

  if (intro.my_role === 'n1') {
    messages = messages.filter(m => {
      return !['to_rate', 'to_rate_feedback'].includes(m.introduction_status)
    })
  }

  if (intro.my_role === 'n2') {
    messages = messages.filter(m => {
      return !['from_rate', 'from_rate_feedback'].includes(
        m.introduction_status
      )
    })
  }

  // Remove confirmed messages EXCEPT the most recent one
  const recentConfirmedMessage = messages
    .reverse()
    .find(m => m.introduction_status === 'confirmed')
  if (recentConfirmedMessage) {
    messages = messages.filter(m => {
      return (
        m.id === recentConfirmedMessage.id ||
        !['confirmed'].includes(m.introduction_status)
      )
    })
  }

  return messages
}

export function generateTimelines(intro, user) {
  if (!intro) return []

  const messages = orderAndSanitizeIntroMessages(intro)

  const timelines = []
  const isAutomatic = true
  const isBroker =
    !intro.my_role /*TODO workaround for old api methods */ &&
    intro.my_role === 'broker'
  let isPublished = false
  let isAccepted = false

  let brokerContact = {
    id: null,
    name: user.first_name,
    email: user.email,
    profile_pic_url: user.profile_pic_url,
    isYou: true,
  }
  let fromContact = {
    id: intro.fromContact.id,
    name: intro.from,
    email: intro.from_email,
    profile_pic_url: intro.fromContact.profile_pic_url,
    isYou: false,
  }
  let toContact = {
    id: intro.toContact.id,
    name: intro.to,
    email: intro.to_email,
    profile_pic_url: intro.toContact.profile_pic_url,
    isYou: false,
  }

  if (intro.my_role === 'n1' || intro.my_role === 'n2') {
    if (intro.my_role === 'n1') {
      fromContact = {
        id: null,
        name: intro.from,
        email: intro.from_email,
        profile_pic_url: user.profile_pic_url,
        isYou: true,
      }
    } else if (intro.my_role === 'n2') {
      toContact = {
        id: null,
        name: intro.to,
        email: intro.to_email,
        profile_pic_url: user.profile_pic_url,
        isYou: true,
      }
    }

    brokerContact = {
      id: null,
      name: intro.broker,
      email: intro.broker_email,
      profile_pic_url: intro.broker_profile_pic_url,
      isYou: false,
    }
  }

  const toName = toContact.name
  const fromFirstName = extractFirstName(fromContact.name)
  const fromName = fromContact.name

  messages.forEach((message, i) => {
    const isAutomaticEmail = message.trigger_reason === 'reminder'

    switch (message.introduction_status) {
      case 'initialized':
        if (isAutomaticEmail) {
          timelines.push({
            text: `Automatic opt-in intro email reminder sent to ${fromName}`,
            time: message.sent_at,
            isAutomatic,
          })
        } else {
          timelines.push({
            text: `Opt-in intro email sent to ${fromName}`,
            time: message.sent_at,
            by: brokerContact,
            note: <Linkify>{message.content}</Linkify>,
          })
        }
        break
      case 'confirmed':
        if (isAutomaticEmail && isBroker) {
          timelines.push({
            text:
              'Automatic intro confirmation email reminder sent to ' +
              brokerContact.name,
            time: message.sent_at,
            isAutomatic,
          })
        } else {
          timelines.push({
            text: `Intro to ${toName} approved`,
            time: message.sent_at,
            by: fromContact,
            note: (
              <div>
                <p>
                  Reason: {intro.reason}
                  <br />
                  Bio: {intro.bio}
                  {intro.linkedin_profile_url && (
                    <LinkedinLink
                      href={intro.linkedin_profile_url}
                      target="_blank"
                    >
                      <br />
                      {intro.linkedin_profile_url}
                    </LinkedinLink>
                  )}
                </p>
              </div>
            ),
          })
        }
        break
      case 'published':
        if (!isPublished) {
          timelines.push({
            text: 'Intro forwarded',
            time: message.sent_at,
            by: brokerContact,
          })
          isPublished = true
        }
        if (isAutomaticEmail) {
          timelines.push({
            text: `Automatic intro email reminder sent to ${toName}`,
            time: message.sent_at,
            isAutomatic,
          })
        } else if (intro.my_role !== 'n1') {
          timelines.push({
            text: `Intro email sent to ${toName}`,
            time: message.sent_at,
            by: brokerContact,
            note:
              intro.my_role === 'n2' ? (
                <div>
                  <p>
                    {intro.note}
                    <br />
                    <br />
                    Context provided by {fromFirstName}:<br />
                    {intro.reason}
                    <br />
                    <br />
                    {fromFirstName}'s Bio:
                    <br />
                    {intro.bio}
                  </p>
                </div>
              ) : (
                <Linkify>{message.content}</Linkify>
              ),
          })
        }
        break
      case 'accepted':
        if (!isAccepted) {
          if (intro.flow !== 'fast') {
            timelines.push({
              text: `Intro accepted`,
              time: message.sent_at,
              by: toContact,
            })
          }
          timelines.push({
            text: `Intro completed`,
            time: message.sent_at,
            by: brokerContact,
            note:
              intro.flow === 'fast' ? (
                <Linkify>{intro.message}</Linkify>
              ) : (
                `${fromName} and ${toName} are now connected 🎉`
              ),
          })
          isAccepted = true
        }
        break
      case 'from_rate':
        timelines.push({
          text: `Intro feedback email sent to ${fromName}`,
          time: message.sent_at,
          by: brokerContact,
        })
        break
      case 'from_rate_feedback':
        if (intro.rating) {
          const note = intro.rating_message ? (
            <div>
              The intro was {humanizeRating(intro.rating)}.<br />
              {intro.rating_message}
            </div>
          ) : (
            `The intro was ${humanizeRating(intro.rating)}.`
          )
          timelines.push({
            text: `Feedback on the intro to ${toName}`,
            time: message.sent_at,
            note,
            by: fromContact,
          })
        }
        break
      case 'to_rate':
        timelines.push({
          text: `Intro feedback email sent to ${toName}`,
          time: message.sent_at,
          by: brokerContact,
        })
        break
      case 'to_rate_feedback':
        if (intro.to_rating) {
          const note = intro.to_rating_message ? (
            <div>
              The intro was {humanizeRating(intro.to_rating)}.<br />
              {intro.to_rating_message}
            </div>
          ) : (
            `The intro was ${humanizeRating(intro.to_rating)}.`
          )
          timelines.push({
            text: `Feedback on the intro to ${fromName}`,
            time: message.sent_at,
            note,
            by: toContact,
          })
        }
        break
      default:
        break
    }
  })

  switch (intro.status) {
    case 'canceled':
      timelines.push({
        text: `Intro declined`,
        time: intro.updated_at,
        by: fromContact,
        note: intro.cancelation_message ? (
          <div>
            Reason: {humanizeReason(intro.cancelation_reason)} <br /> Message:{' '}
            {intro.cancelation_message}
          </div>
        ) : intro.cancelation_reason ? (
          <div>Reason: {humanizeReason(intro.cancelation_reason)} </div>
        ) : null,
      })
      break
    case 'rejected':
      timelines.push({
        text: `Intro declined`,
        time: intro.updated_at,
        by: toContact,
        note: intro.cancelation_message ? (
          <div>
            Reason: {humanizeReason(intro.cancelation_reason)} <br /> Message:{' '}
            {intro.cancelation_message}
          </div>
        ) : intro.cancelation_reason ? (
          <div>Reason: {humanizeReason(intro.cancelation_reason)} </div>
        ) : null,
      })
      break
    case 'canceled_by_owner':
      timelines.push({
        text: 'Intro canceled by You',
        time: intro.updated_at,
        by: brokerContact,
      })
      break
    default:
      break
  }

  return timelines
}
