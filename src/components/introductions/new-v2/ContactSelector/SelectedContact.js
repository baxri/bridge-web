import React from 'react'
import {
  InputContainer,
  InputLabel,
  ContactTitle,
  LiIcon,
  ExpandCollapse,
} from './styled'
import Avatar from 'components/shared/components/Avatar'
import styled from 'styled-components'
import * as gs from '../gmail-style'

const Item = styled.button`
  display: flex;
  align-items: center;
  background-color: ${p => (p.highlight ? gs.colorLightGray : '#fff')};
  border: 1px solid ${gs.colorLightGray};
  border-radius: 14px;
  height: 28px;
  padding: 1px;
  outline: 0 !important;
  max-width: 100%;
`

const Items = styled.div`
  flex: 10;
  overflow: hidden;
`

class SelectedContact extends React.Component {
  render() {
    const {
      contact,
      collapsed = true,
      collapseDisabled = false,
      label = '',
      showLabel = true,
      labelWidth = undefined,
      highlight = false,
      onClick = () => {},
      onExpand = () => {},
      onCollapse = () => {},
      linkedinLoading = false,
    } = this.props
    return (
      <InputContainer>
        <InputLabel width={labelWidth} hide={!showLabel}>
          {label}
        </InputLabel>
        <Items>
          <Item {...{ onClick, highlight }}>
            <Avatar {...contact} size="24px" />
            <ContactTitle>{contact.name || contact.email}</ContactTitle>
          </Item>
        </Items>
        {linkedinLoading ? (
          <span className="fa fa-spinner fa-spin" />
        ) : (
          <LiIcon href={contact.linkedin_profile_url} isLink />
        )}
        <ExpandCollapse
          onClick={e =>
            collapseDisabled ? null : collapsed ? onExpand(e) : onCollapse(e)
          }
          collapse={!collapsed}
          disabled={collapseDisabled}
        />
      </InputContainer>
    )
  }
}

export default SelectedContact
