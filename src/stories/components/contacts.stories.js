import React from 'react'
import styled from 'styled-components'
import { Col } from 'reactstrap'
import { storiesOf } from '@storybook/react'

import { SelectedContact } from 'components/shared'
import Suggestions from 'components/introductions/new/ContactSuggestions'
import contacts from '../data/contacts.json'

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  justify-content: space-between;
`

const SuggestionsWrapper = styled.div`
  background-color: #ffffff;
  padding: 15px;
  width: 400px;
`

const SelectedContactStory = () => (
  <Col lg={6} xs={12}>
    <Container>
      <SelectedContact
        {...contacts[0]}
        avatarUrl={contacts[0].profile_pic_url}
        position="left"
      />
      <SelectedContact
        {...contacts[1]}
        avatarUrl={contacts[1].profile_pic_url}
        position="right"
      />
    </Container>

    <Container>
      <SelectedContact
        {...contacts[0]}
        avatarUrl={contacts[0].profile_pic_url}
        position="left"
        close
      />
      <SelectedContact
        {...contacts[1]}
        avatarUrl={contacts[1].profile_pic_url}
        position="right"
        close
      />
    </Container>
  </Col>
)

const suggestions = [
  { id: 1, name: 'Elang', email: 'elang@example.com' },
  { id: 2, name: 'Harimau', email: 'harimau@example.com' },
  { id: 3, name: 'Embe', email: 'embe@example.com' },
  { id: 4, name: 'Entog', email: 'entog@example.com' },
]

class ContactSuggestions extends React.Component {
  state = {
    suggestions: suggestions,
    from: [],
    receivers: [],
  }

  onSelected = field => value => {
    this.setState({ [field]: value }, () => {
      const selected = this.state.from
        .concat(this.state.receivers)
        .map(s => s.id)
      const newSuggestions = suggestions.filter(suggestion => {
        if (suggestion.id && selected.includes(suggestion.id)) {
          return false
        }
        return true
      })
      this.setState({ suggestions: newSuggestions })
    })
  }

  render() {
    return (
      <SuggestionsWrapper>
        <Suggestions
          label="Intro"
          suggestions={this.state.suggestions}
          max={1}
          onSelected={this.onSelected('from')}
        />
        <Suggestions
          label="To"
          suggestions={this.state.suggestions}
          onSelected={this.onSelected('receivers')}
        />
      </SuggestionsWrapper>
    )
  }
}

storiesOf('COMPONENTS|Contact', module)
  .add('Selected Contact', () => <SelectedContactStory />)
  .add('Contact Suggestions', () => <ContactSuggestions />)
