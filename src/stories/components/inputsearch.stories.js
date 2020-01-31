import React from 'react'
import { storiesOf } from '@storybook/react'

import { SearchInput } from 'components/shared'

class SearchStory extends React.Component {
  state = {
    query: '',
  }

  onChange = event => {
    this.setState({ query: event.target.value })
  }

  render() {
    return (
      <SearchInput
        value={this.state.query}
        onChange={this.onChange}
        keepTooltipOpen={false}
      />
    )
  }
}

storiesOf('COMPONENTS|Search Input', module).add('Default', () => (
  <SearchStory />
))
