import React from 'react'
import { sortBy } from 'lodash'

import { Heading } from 'components/shared'
import { toDateHeading } from 'utils/formatter'

import { Scrollable, Messages } from './styled'
import Message from './Message'
import { generateTimelines } from './helper'

class Timeline extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      timelines: generateTimelines(props.intro, props.user),
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.intro.id !== this.props.intro.id) {
      this.setState({
        timelines: generateTimelines(this.props.intro, this.props.user),
      })
    }
  }

  sortTimelines = () => {
    const timelines = sortBy(
      this.state.timelines,
      timeline => timeline.time
    ).reverse()
    const timelinesByDate = {}
    timelines.forEach((timeline, i) => {
      var date = new Date(timeline.time)
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      timelinesByDate[date]
        ? timelinesByDate[date].push(timeline)
        : (timelinesByDate[date] = [timeline])
    })
    return timelinesByDate
  }

  render() {
    const timelines = this.sortTimelines()
    return (
      <Scrollable status={this.props.intro.status}>
        {Object.keys(timelines).map(timelineDate => {
          return (
            <div key={timelineDate}>
              <Heading.DateHeading>
                {toDateHeading(timelineDate)}
              </Heading.DateHeading>
              <Messages>
                {timelines[timelineDate].map((message, index) => {
                  return (
                    <Message key={`${message.time}-${index}`} {...message} />
                  )
                })}
              </Messages>
            </div>
          )
        })}
      </Scrollable>
    )
  }
}

export default Timeline
