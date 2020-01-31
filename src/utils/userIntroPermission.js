class UserIntroPermission {
  constructor(intro, user) {
    this.intro = intro
    this.user = user
  }

  canPublish() {
    if (this.intro) {
      const validStatus = ['initialized', 'confirmed', 'delayed', 'published']

      return {
        can: validStatus.includes(this.intro.status),
        message: this.message(),
      }
    }

    return { can: false, message: this.message() }
  }

  canCancelByOwner() {
    if (this.intro) {
      const validStatus = ['initialized', 'confirmed', 'delayed']

      return {
        can: validStatus.includes(this.intro.status),
        message: this.message(),
      }
    }

    return { can: false, message: this.message() }
  }

  message() {
    if (!this.intro) return ''

    const { status } = this.intro

    if (status === 'accepted') return 'Intro has already been completed'

    if (status === 'published') {
      if (this.user) {
        return 'You have already confirmed this Intro'
      }

      return `${this.intro.broker} already confirmed this Intro`
    }

    if (status === 'canceled_by_owner') {
      if (this.user) return 'You have already declined this Intro'

      return `${this.intro.broker} already declined this Intro`
    }

    if (status === 'confirmed') {
      if (this.user) return 'Intro has been forwarded'
    }

    if (['canceled', 'rejected'].includes(status))
      return `Intro has been declined`

    return `Intro has been ${status}`
  }
}

export default (intro, user) => {
  return new UserIntroPermission(intro, user)
}
