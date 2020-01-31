import { max } from 'lodash'

export const getIntroLatestTime = intro =>
  max([intro.updated_at, ...intro.messages.map(m => m.sent_at)])

/**
 * Get the number of introductions has status `confirmed` with `broker` role
 * @param {Array} intros
 */
export const introsConfirmedAsBroker = intros =>
  intros.filter(
    intro => intro.my_role === 'broker' && intro.status === 'confirmed'
  ).length
