import { flatMap, sortBy } from 'lodash'

const extractIntroActivity = (message, intro) => {
  const isReminder = message.trigger_reason === 'reminder'
  let subject = ''
  let action = ''

  switch (message.introduction_status) {
    case 'initialized':
      subject = isReminder ? 'Automatic email reminder' : 'Opt-in email'
      action = 'sent to'
      return {
        text: `${subject} ${action} <b>${intro.from}</b> to intro them to <b>${intro.to}</b>`,
        time: message.sent_at,
        introId: intro.id,
      }
    case 'confirmed':
      subject = isReminder ? 'Automatic email reminder' : 'Opt-in email'
      return {
        text: `${subject} approved by <b>${intro.from}</b> to intro them to <b>${intro.to}</b>`,
        time: message.sent_at,
        introId: intro.id,
      }
    case 'canceled':
      return {
        text: `Opt-in email declined by <b>${intro.from}</b> to intro them to <b>${intro.to}</b>`,
        time: message.sent_at,
        introId: intro.id,
      }
    case 'published':
      subject = isReminder ? 'Automatic email reminder' : 'Opt-in email'
      action = 'sent to'
      return {
        text: `${subject} ${action} <b>${intro.to}</b> to accept intro'ing them to <b>${intro.from}</b>`,
        time: message.sent_at,
        introId: intro.id,
      }
    case 'accepted':
      return {
        text: `<b>${intro.to}</b> accepted intro to <b>${intro.from}</b>`,
        time: message.sent_at,
        introId: intro.id,
      }
    case 'rejected':
      return {
        text: `<b>${intro.to}</b> declined intro to <b>${intro.from}</b>`,
        time: message.sent_at,
        introId: intro.id,
      }
    case 'from_rate':
      return {
        text: `Intro feedback email sent to <b>${intro.from}</b> who was intro'd to <b>${intro.to}</b>`,
        time: message.sent_at,
        introId: intro.id,
      }
    case 'from_rate_feedback':
      return {
        text: `<b>${intro.from}</b> said that the intro to <b>${intro.to}</b> was ${intro.rating}`,
        time: message.sent_at,
        introId: intro.id,
      }
    case 'to_rate':
      return {
        text: `Intro feedback email sent to <b>${intro.to}</b> who was intro'd to <b>${intro.from}</b>`,
        time: message.sent_at,
        introId: intro.id,
      }
    case 'to_rate_feedback':
      return {
        text: `<b>${intro.to}</b> said that the intro to <b>${intro.from}</b> was ${intro.to_rating}`,
        time: message.sent_at,
        introId: intro.id,
      }
    default:
      return {}
  }
}

export default function extractIntroActivities(intros, offset = 0, limit = 15) {
  const messages = flatMap(intros, 'messages').filter(
    message => message.sent_at
  )
  const allMessages = sortBy(messages, message => message.sent_at).reverse()

  const slicedMessages = allMessages.slice(offset, offset + limit)
  const slicedIntros = slicedMessages.map(message =>
    intros.find(intro => intro.messages.some(m => m.id === message.id))
  )

  const activities = slicedMessages.map((message, index) =>
    extractIntroActivity(message, slicedIntros[index])
  )
  const hasMoreActivities = allMessages.length > offset + limit

  return { activities, hasMoreActivities }
}
