import React from 'react'
import styled from 'styled-components'
import { Row } from 'reactstrap'
import Bio from './Bio'
import Avatar from 'components/shared/components/Avatar'

const linkedInImg = '/img/linkedin.png'
const twitterImg = '/img/twitter.png'

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
`

const NameWrapper = styled(Row)`
  padding-top: 32px;
`

const EmailWrapper = styled(Row)`
  justify-content: center;
  align-items: center;
  padding-bottom: 24px;
`

const Name = styled.p`
  font-size: 32px;
  margin-bottom: 0px;
  text-overflow: ellipsis;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
`

const FirstName = styled(Name)`
  font-weight: bold;
  margin-right: 8px;
`

const Email = styled.p`
  color: #848484;
  margin-bottom: 0px;
  text-overflow: ellipsis;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
`

const LinkedInIcon = styled.img`
  height: 18px;
  width: 18px;
  margin-left: 10px;
`

const TwitterIcon = styled.img`
  height: 18px;
  width: 18px;
  margin-left: 5px;
`

const LinkedInWrapper = styled.a`
  text-decoration: none;
`

const TwitterWrapper = styled.a`
  text-decoration: none;
`

const splitNames = name => (name ? name.split(' ') : [])

export default ({
  name,
  email,
  linkedin_profile_url,
  twitter,
  bio,
  profile_pic_url,
  bio_source,
}) => {
  const [fName, ...rest] = splitNames(name)

  return (
    <InfoWrapper>
      <Avatar {...{ name, email, profile_pic_url }} size={'96px'} />
      <NameWrapper>
        <FirstName>{fName}</FirstName>
        <Name>{rest}</Name>
      </NameWrapper>
      <EmailWrapper>
        <Email>{email}</Email>
        {linkedin_profile_url && (
          <LinkedInWrapper
            href={linkedin_profile_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon src={linkedInImg} />
          </LinkedInWrapper>
        )}
        {twitter && (
          <TwitterWrapper
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon src={twitterImg} />
          </TwitterWrapper>
        )}
      </EmailWrapper>
      {bio && <Bio bio={bio} bio_source={bio_source} />}
    </InfoWrapper>
  )
}
