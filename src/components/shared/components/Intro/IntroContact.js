import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

import { Avatar } from 'components/shared'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  flex: 3;
  justify-content: flex-end;
  max-width: 45%;
  ${props => {
    if (props.position === 'left') {
      return `
        flex-direction: row-reverse;
        & > div { text-align: left; }
      `
    }
    return '& > div { text-align: right; }'
  }}
  ${media.lessThan('large')`
    max-width: 45%;
  `}
  ${media.lessThan('small')`
    padding: 0 10px;
  `}
`

const Name = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 45px;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const IntroContact = ({ position, name, email, avatarUrl, rating, isYou }) => {
  let emoji = null
  switch (rating) {
    case 'great':
      emoji = '😀'
      break
    case 'okay':
      emoji = '🙂'
      break
    case 'not_good':
      emoji = '😞'
      break
    default:
      emoji = null
  }
  return (
    <Wrapper position={position}>
      <Name>{isYou ? 'You' : name}</Name>
      <Avatar
        profile_pic_url={avatarUrl}
        name={name}
        style={{ margin: '0 10px', maxWidth: '40%' }}
        emoji={emoji}
      />
    </Wrapper>
  )
}

IntroContact.defaultProps = {
  position: 'left',
  isYou: false,
}

export default IntroContact
