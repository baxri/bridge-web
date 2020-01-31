import { some, orderBy } from 'lodash'
import { strip } from 'utils/fastFilter'

const isDateActive = date => {
  const new_date = new Date()
  new_date.setDate(new_date.getDate() - 28)
  return new Date(date) >= new_date
}

const isIntroCompleted = intro => intro.status === 'accepted'

const isIntroRated = intro =>
  (intro.my_role &&
    intro.my_role === 'broker' &&
    (intro.rating !== null || intro.to_rating !== null)) ||
  (intro.my_role && intro.my_role === 'n1' && intro.rating !== null) ||
  (intro.my_role && intro.my_role === 'n2' && intro.to_rating !== null)

const isIntroDeclined = intro =>
  intro.status === 'canceled' || intro.status === 'rejected'

const isIntroCanceledByBroker = intro => intro.status === 'canceled_by_owner'

const isIntroActive = intro =>
  (intro.status === 'initialized' ||
    intro.status === 'published' ||
    intro.status === 'confirmed' ||
    intro.status === 'accepted') &&
  isDateActive(intro.updated_at)

const isNoReply = intro =>
  intro.status === 'initialized' || intro.status === 'published'

const completedIntros = intros =>
  intros.filter(intro => isIntroCompleted(intro))

const ratedIntros = intros => intros.filter(intro => isIntroRated(intro))

const declinedIntros = intros => intros.filter(intro => isIntroDeclined(intro))

const activeIntros = intros =>
  intros
    .filter(
      intro =>
        !isIntroCompleted(intro) &&
        !isIntroDeclined(intro) &&
        !isIntroCanceledByBroker(intro)
    )
    .filter(intro => isIntroActive(intro))

const confirmedIntros = intros =>
  intros.filter(intro => intro.status === 'confirmed')

const archivedIntros = intros =>
  intros
    .filter(
      intro =>
        !isIntroCompleted(intro) &&
        !isIntroDeclined(intro) &&
        !isIntroCanceledByBroker(intro)
    )
    .filter(intro => !isIntroActive(intro))

const noreplyIntros = intros => intros.filter(isNoReply)

const filterIntro = (status, intro) => {
  switch (status) {
    case 'all':
      return true
    case 'active':
      return isIntroActive(intro)
    case 'confirm':
      return intro.status === 'confirmed' && intro.my_role === 'broker'
    case 'noreply':
      return isNoReply(intro)
    case 'completed':
      return isIntroCompleted(intro)
    case 'rated':
      return isIntroRated(intro)
    case 'declined':
      return isIntroDeclined(intro) && !isIntroCanceledByBroker(intro)
    case 'archived':
      return (
        !isIntroCompleted(intro) &&
        !isIntroDeclined(intro) &&
        !isIntroActive(intro) &&
        !isIntroCanceledByBroker(intro)
      )
    case 'received':
      return intro.my_role && intro.my_role !== 'broker'
    default:
      return false
  }
}

const searchFilter = (intros, { status, query }) => {
  query = strip(query)

  const keys = ['to', 'from', 'to_email', 'from_email']

  return orderBy(intros, ['updated_at'], 'desc').filter(intro => {
    const index = keys.map(key => (intro[key] ? intro[key].toLowerCase() : ''))

    index[0] = strip(index[0])
    index[1] = strip(index[1])
    index[2] = strip(index[2])
    index[3] = strip(index[3])

    const searchMatched = some(index, i => i.indexOf(query.toLowerCase()) >= 0)
    const filterMatched = filterIntro(status, intro)

    return searchMatched && filterMatched
  })
}

export {
  isIntroCompleted,
  isIntroDeclined,
  isIntroCanceledByBroker,
  isIntroActive,
  completedIntros,
  ratedIntros,
  declinedIntros,
  activeIntros,
  confirmedIntros,
  archivedIntros,
  noreplyIntros,
  searchFilter,
}
