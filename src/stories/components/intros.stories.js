import React from 'react'
import { storiesOf } from '@storybook/react'

import { Intro } from 'components/shared'
import intros from '../data/intros.json'

const IntroStory = () => <Intro {...intros[0]} />

class ListIntros extends React.Component {
  state = {
    introductions: [...intros],
    activeIntroduction: null,
  }

  setActive = id => {
    const introduction = this.state.introductions.find(i => i.id === id)
    this.setState({ activeIntroduction: introduction })
  }

  render() {
    return (
      <div>
        <h1>With Feedback</h1>
        <div style={{ display: 'flex' }}>
          <div>
            {this.state.introductions.map(intro => (
              <Intro
                key={intro.id}
                {...intro}
                onClick={this.setActive}
                expanded={!this.state.activeIntroduction}
              />
            ))}
          </div>
          {this.state.activeIntroduction && (
            <div>
              <h2>
                Active{' '}
                {this.state.activeIntroduction &&
                  this.state.activeIntroduction.id}
              </h2>
              <button onClick={() => this.setActive(null)}>close</button>
            </div>
          )}
        </div>

        <h1>Without Feedback</h1>
        <div>
          {this.state.introductions.map(intro => (
            <Intro key={intro.id} {...intro} onClick={this.setActive} />
          ))}
        </div>
      </div>
    )
  }
}

storiesOf('COMPONENTS|Intro', module)
  .add('Intro item', () => <IntroStory />)
  .add('List intros', () => <ListIntros />)
