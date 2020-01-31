import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'
import CopyToClipboard from 'react-copy-to-clipboard'
import { withSnackbar } from 'notistack'

import {
  fetchContact,
  fetchContactByNameAndEmail,
} from 'intropath-core/actions/contacts'
import { setContactFilter } from 'actions/filter'
import { orderAllByLatest, filterIntrosForContact } from 'utils/contactFilter'
import { Heading, Button } from 'components/shared'
import FilterIntros from './ContactIntro/FilterIntros'
import ContactIntros from './ContactIntro/ContactIntros'
import { parse } from 'utils/queryString'
import extractFirstName from 'utils/extractFirstName'
import { MixpanelContext } from 'utils/mixpanelContext'
import ContactInfo from './ContactInfo'
import { colors } from 'components/theme'
import { checkUserTokens } from 'utils/checkGoogleAccount'

const BtnToggle = styled(DropdownToggle)`
  color: white;
  vertical-align: middle;
  text-align: center;
  font-size: 16px;
  display: inline-block;
  white-space: nowrap;
  padding: 12px 0 !important;

  &:hover {
    color: white;
  }
`

const Item = styled(DropdownItem)`
  ${media.lessThan('large')`
    width: 315px;
    text-align: center;
    margin-right:35px;
    word-break: break-word;
    white-space: pre-line !important;
  `}
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.lessThan('large')`
    .dropdown-menu {
      width: 100%;
      top: unset !important;
      transform: unset !important;
    }
  `}
`

const Dropdown = styled(UncontrolledDropdown)`
  background: ${colors.primary};
  border-radius: 8px;
  height: 48px;
  padding: 0px 24px;
  width: 250px;
  margin-bottom: 15px;
  ${media.lessThan('large')`
    width: 100%;
  `}

  &:active {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
      ${colors.primary};
  }
`

const ShareButton = styled(Button)`
  width: 250px;
  margin-bottom: 24px;
  ${media.lessThan('large')`
    width: 100%;
  `}
`

class Contact extends React.Component {
  static contextType = MixpanelContext

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.setFilterFromParams()
    }
  }

  setFilterFromParams = () => {
    const { query, filter, page } = parse(this.props.location.search)
    this.props.setContactFilter({
      query: query || '',
      status: filter || 'active',
      page: page ? parseInt(page) : 1,
    })
  }

  componentDidMount() {
    const { contactId } = this.props.match.params
    const { name, email } = parse(this.props.location.search)

    this.setFilterFromParams()
    this.context.mixpanel.track('NAVIGATED_TO')

    if (contactId) this.props.fetchContact(contactId)
    else if (name && email) this.props.fetchContactByNameAndEmail(name, email)
  }

  share = () => {
    const {
      user,
      data: { contact },
    } = this.props

    this.context.mixpanel.identify(user.id)
    this.context.mixpanel.track('INTRO_LINK_CLICKED', {
      UserId: user.id,
      ContactId: contact.id,
    })
  }

  onStartIntroClickForContact = request_type => {
    const {
      user,
      history,
      data: { contact },
    } = this.props
    // Short delay because even though DropdownItem supports onClick
    // it also makes to prop mandatory, so we want the onClick (i.e. this method)
    // to fire slightly afterwards
    setTimeout(() => {
      checkUserTokens(
        user.tokens,
        history,
        `/introductions/new?contact_id=${contact.id}&request_type=${request_type}`
      )
    }, 100)
  }

  render() {
    const {
      data: { contact, intros, loaded },
      enqueueSnackbar,
    } = this.props

    if (!loaded || !contact) return null

    const contactName = contact.name
      ? extractFirstName(contact.name)
      : contact.email

    return (
      <div>
        <Heading.HeaderAction text={'Contact Profile'} />
        <ContactInfo {...contact} />
        <ButtonsWrapper>
          <Dropdown>
            <BtnToggle nav caret>
              <span>Make an intro</span>
            </BtnToggle>
            <DropdownMenu right>
              <Item
                tag={Link}
                onClick={() => {
                  this.onStartIntroClickForContact(1)
                }}
                to={`/contacts/${contact.id}`}
              >
                Intro {contactName} to someone
              </Item>
              <Item divider />
              <Item
                tag={Link}
                onClick={() => {
                  this.onStartIntroClickForContact(2)
                }}
                to={`/contacts/${contact.id}`}
              >
                Intro someone to {contactName}
              </Item>
            </DropdownMenu>
          </Dropdown>
          <CopyToClipboard
            onCopy={() => {
              enqueueSnackbar('Intro Link Copied')
            }}
            text={contact.share_link}
          >
            <ShareButton alt="true" onClick={this.share}>
              Intro Link
            </ShareButton>
          </CopyToClipboard>
        </ButtonsWrapper>
        {intros.length > 0 && <FilterIntros intros={intros} />}
        {intros.length > 0 && <ContactIntros intros={intros} />}
      </div>
    )
  }
}

const mapStateToProps = ({ contacts, introduction }) => {
  const contact = contacts.contact
  const loaded = !!contact
  const intros = introduction.list
  const introsForContact = loaded ? filterIntrosForContact(intros, contact) : []
  const sortedIntros = orderAllByLatest(introsForContact)
  return {
    data: {
      contact,
      intros: sortedIntros,
      loaded,
      // maybe add types.FETCH_CONTACTS_START to reset `loaded` to false
    },
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    { fetchContact, fetchContactByNameAndEmail, setContactFilter }
  ),
  withRouter
)

export default enhance(withSnackbar(Contact))
