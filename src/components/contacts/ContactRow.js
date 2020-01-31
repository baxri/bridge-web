import React, { PureComponent } from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { withRouter } from 'react-router-dom'

import { Icons, Avatar } from 'components/shared'

const Bold = styled.span`
  ${props => {
    if (props.weight !== undefined) {
      return `font-weight: ${props.weight}`
    } else {
      return 'font-weight: bold'
    }
  }};
`

const DivWrapper = styled.div`
  ${media.lessThan('large')`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  `}
`

class ContactRow extends PureComponent {
  goToContact = () => {
    this.props.history.push('/contacts/' + this.props.id)
  }

  render() {
    const {
      name,
      email,
      id,
      index,
      profile_pic_url,
      introductions_count,
    } = this.props

    const slug = (id || name) + index
    const avatarStyle = index === 0 ? { width: 50 } : null

    return (
      <tr
        style={{ cursor: 'pointer' }}
        className="contact-row"
        onClick={this.goToContact}
        key={slug}
      >
        <td style={avatarStyle} className="align-middle text-center">
          <Avatar {...{ name, email, profile_pic_url }} size="medium" />
        </td>

        <td className={name ? 'contact-name' : 'align-middle'}>
          <Bold weight={500}>{name}</Bold>
          {name && <br />}
          <DivWrapper>{email}</DivWrapper>
        </td>

        <td className="align-middle text-center text-primary">
          {introductions_count}
        </td>
        <td className="align-middle text-center">
          <Icons.EditButton />
        </td>
      </tr>
    )
  }
}

export default withRouter(ContactRow)
