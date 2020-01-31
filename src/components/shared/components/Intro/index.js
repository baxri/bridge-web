import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import { connect } from 'react-redux'

import { Icons } from 'components/shared'
import IntroContact from './IntroContact'
import IntroStatus from './IntroStatus'
import IconState from './IconState'
import TimeAgo from './TimeAgo'

const IntroItem = styled.a`
  background-color: #e5e5e5;
  display: block;
  opacity: 0.85;
  border-top: 1px solid #dfe1e7;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  ${props =>
    props.active &&
    `
    font-weight: bold;
    background-color: #ffffff;
    border-left: 2px solid #047BFE;
  `}

  ${media.lessThan('large')`
    border: ${p => (p.footer ? '1px solid #e5e5e5' : 'none')};
    margin-bottom: 6px;
    box-shadow: 0px 0px 17px rgba(0, 0, 0, 0.1);
    border-radius: 9px !important;
  `}
`

const IntroItemBody = styled.div`
  padding: 15px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background-color: #fafafa;

  &:hover {
    background-color: #eeeeee;
  }

  ${media.lessThan('large')`
    padding: 18px 10px;
    border-radius: 9px !important;
  `}
`

const Connector = styled.div`
  margin-top: 1px;
  font-size: 10px;
  line-height: 22px;
  text-align: center;
`

const StyledIcon = styled.div`
  flex: 1;
  max-width: 45px;
  text-align: right;
  ${media.lessThan('large')`
    display: none;
  `}
`

class Intro extends React.PureComponent {
  render() {
    const {
      id,
      from_email,
      to_email,
      updated_at,
      status,
      rating,
      to_rating,
      onClick,
      expanded,
      activeIntro,
      my_role,
      broker,
    } = this.props

    let { from, to, from_profile_pic_url, to_profile_pic_url } = this.props

    if (my_role === 'n1') {
      from_profile_pic_url = this.props.user.profile_pic_url
    }

    if (my_role === 'n2') {
      to_profile_pic_url = this.props.user.profile_pic_url
    }

    const showConnector = my_role && my_role !== 'broker'

    return (
      <IntroItem
        onClick={() => onClick(id)}
        active={activeIntro}
        footer={showConnector}
      >
        <IntroItemBody>
          <TimeAgo date={updated_at} />
          <IntroContact
            position="right"
            {...{
              name: from,
              avatarUrl: from_profile_pic_url,
              email: from_email,
              rating,
              isYou: my_role === 'n1',
            }}
          />
          <IconState status={status} />
          <IntroContact
            position="left"
            {...{
              name: to,
              avatarUrl: to_profile_pic_url,
              email: to_email,
              rating: to_rating,
              isYou: my_role === 'n2',
            }}
          />
          {expanded && (
            <IntroStatus {...{ status, from, to, my_role, broker }} />
          )}
          <StyledIcon>
            {activeIntro ? (
              <Icons.AngleLeft style={{ color: '#047BFE' }} />
            ) : (
              <Icons.AngleRight />
            )}
          </StyledIcon>
        </IntroItemBody>
        {showConnector && <Connector>Introduction by {broker}</Connector>}
      </IntroItem>
    )
  }
}

const mapStateToProps = (
  { introduction: { intro: state }, auth: { user } },
  ownProps
) => ({
  activeIntro: state && state.id === ownProps.id,
  user,
})

export default connect(mapStateToProps)(Intro)
