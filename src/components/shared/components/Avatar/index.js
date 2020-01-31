import React from 'react'
import styled from 'styled-components'
import nameToColor from './nameToColor'

const AvatarWrapper = styled.div`
  position: relative;
`

const AvatarShape = styled.div`
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: ${p => p.fontSize};
  position: relative;
  text-transform: uppercase;
  flex: 0;
  min-width: ${p => p.size};
  min-height: ${p => p.size};
  width: ${p => p.size};
  height: ${p => p.size};
  border-radius: 100%;
  overflow: hidden;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  background-color: ${p => p.color};
`

const AvatarImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  min-width: ${p => p.size};
  min-height: ${p => p.size};
  width: ${p => p.size};
  height: ${p => p.size};
  border-radius: 100%;
  overflow: hidden;
`

const AvatarEmoji = styled.div`
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 17px;
  height: 17px;
  font-size: 14px;
  //border-radius: 8.5px;
  //border: 1px solid #ececec;
  //background-color: #ececec;
`

const oldSizes = {
  small: '30px',
  medium: '50px',
  big: '85px',
}

const Avatar = React.memo(
  ({
    profile_pic_url,
    name,
    email,
    size = 'small',
    src = undefined,
    emoji = undefined,
    ...rest
  }) => {
    size = oldSizes[size] || size
    if (src) {
      profile_pic_url = src
    }
    const initial =
      name && name.length > 0
        ? name[0]
        : email && email.length > 0
        ? email[0]
        : '#'
    const fontSize = size.match(/(\d+)/)
      ? size.match(/(\d+)/)[1] / 2 + 'px'
      : '14px'
    const avatar = `${initial.toUpperCase()}`

    // these hacks required to keep component pure
    let ref, onLoad, onError
    if (profile_pic_url) {
      ref = React.createRef()
      onLoad = () => {
        ref.current.style.visibility = 'hidden'
      }
      onError = e => {
        e.target.style.display = 'none'
      }
    }

    return (
      <AvatarWrapper {...rest}>
        <AvatarShape
          ref={ref}
          color={nameToColor(initial)}
          size={size}
          fontSize={fontSize}
        >
          {avatar}
        </AvatarShape>
        {profile_pic_url && (
          <AvatarImg
            size={size}
            src={profile_pic_url}
            onLoad={onLoad}
            onError={onError}
          />
        )}
        {emoji ? <AvatarEmoji>{emoji}</AvatarEmoji> : null}
      </AvatarWrapper>
    )
  }
)

export default Avatar
