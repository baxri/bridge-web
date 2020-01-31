import React from 'react'
import match from './match'
import parse from 'autosuggest-highlight/parse'
import {
  LiIcon,
  ContactResultsContainer,
  ContactItem,
  ContactDetails,
  StyledContactName,
  StyledContactEmail,
  StyledIntrosCount,
} from './styled'
import Avatar from 'components/shared/components/Avatar'

const HighlightedText = ({ text, highlight }) => {
  const res = parse(text, match(text, highlight, { insideWords: true }))
  return (
    <React.Fragment>
      {res.map((item, i) => (
        <span key={i} style={item.highlight ? { fontWeight: 'bold' } : null}>
          {item.text}
        </span>
      ))}
    </React.Fragment>
  )
}

const ContactName = props => (
  <StyledContactName>
    <HighlightedText {...props} />
  </StyledContactName>
)
const ContactEmail = props => (
  <StyledContactEmail>
    <HighlightedText {...props} />
  </StyledContactEmail>
)
const IntrosCount = props =>
  props.count > 0 && (
    <StyledIntrosCount>
      <strong>{props.count}</strong> INTROS
    </StyledIntrosCount>
  )

export default React.memo(function ContactResults({
  contacts,
  query,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  highlightIndex = -1,
}) {
  if (!contacts || !contacts.length) return null

  return (
    <ContactResultsContainer>
      {contacts.map((item, i) => (
        <ContactItem
          key={i}
          onClick={() => onSelect(item)}
          highlight={highlightIndex === i}
        >
          <Avatar {...item} size="28px" />
          <ContactDetails>
            <ContactName text={item.name} highlight={query} />
            <ContactEmail text={item.email} highlight={query} />
            <IntrosCount count={item.introductions_count} />
          </ContactDetails>
          {item.linkedin_profile_url && (
            <LiIcon href={item.linkedin_profile_url} isLink={false} />
          )}
        </ContactItem>
      ))}
    </ContactResultsContainer>
  )
})
