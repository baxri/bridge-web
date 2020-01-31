import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`

const AvatarWrapper = styled.div`
  width: 100%;
  text-align: center;
`

const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  text-align: center;
`

const NameWrapper = styled.div`
  vertical-align: middle;
  font-size: 18px;
  text-align: center;
`

const LinkedInWrapper = styled.a`
  display: inline-block;
  height: 100%;
  vertical-align: top;
  margin-left: 5px;
`

const LinkedInImage = styled.img`
  vertical-align: top;
  max-height: 20px;
`
const Bio = styled.div`
  vertical-align: middle;
  font-size: 16px;
  padding-top: 10px;
`

const ReasonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 10px 0;
`

const AvatarThumbnailWrapper = styled.div`
  vertical-align: top;
  width: 40px;
`

const AvatarThumbnail = styled.img`
  border-radius: 50%;
  width: 40px;
  text-align: center;
`

const CaretWrapper = styled.div`
  vertical-align: top;
  padding-left: 0;
  text-align: left;
  background-color: transparent;
  width: 10px;
  text-align: right;
`

const Caret = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 0;
  border-color: transparent #ecf0f0 transparent transparent;
`

const Reason = styled.div`
  vertical-align: top;
  flex: 1;
  margin: 0;
  background: #ecf0f0;
  padding: 20px;
  text-align: left;
  font-weight: 500;
  color: #000;
  border-radius: 5px;
  border-top-left-radius: 0;
`

const ReasonText = styled.span`
  whitespace: pre-line;
`

const TextWrapper = styled.p`
  word-wrap: break-word;
`

const defaultAvatar = '/img/default_avatar.jpg'

const IntroContext = ({ name, bio, reason, avatarUrl, linkedinUrl }) => {
  if (!avatarUrl) {
    return (
      <div>
        <TextWrapper>
          <i>Reason</i>
          <br />
          {reason}
        </TextWrapper>
        <TextWrapper>
          <i>Bio</i>
          <br />
          {bio}
          {linkedinUrl && <br />}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              {linkedinUrl}
            </a>
          )}
        </TextWrapper>
      </div>
    )
  } else {
    return (
      <Wrapper>
        <AvatarWrapper>
          <Avatar
            name={name}
            src={avatarUrl}
            onError={e => (e.target.src = defaultAvatar)}
          />
        </AvatarWrapper>
        <NameWrapper>
          {name}
          {linkedinUrl && (
            <LinkedInWrapper
              rel="noopener noreferrer"
              target="_blank"
              href={linkedinUrl}
            >
              <LinkedInImage alt="LinkedIn" src="/img/linkedin.png" />
            </LinkedInWrapper>
          )}
        </NameWrapper>
        <Bio>{bio}</Bio>

        <ReasonWrapper>
          <AvatarThumbnailWrapper>
            <AvatarThumbnail
              alt={name}
              src={avatarUrl}
              onError={e => (e.target.src = defaultAvatar)}
            />
          </AvatarThumbnailWrapper>
          <CaretWrapper>
            <Caret />
          </CaretWrapper>
          <Reason>
            <ReasonText>{reason}</ReasonText>
          </Reason>
        </ReasonWrapper>
      </Wrapper>
    )
  }
}

export default IntroContext
