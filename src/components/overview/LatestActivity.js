import React from 'react'
import { map } from 'lodash'
import { connect } from 'react-redux'

import { Heading, Activity, EmptyState } from 'components/shared'
import ViewAll from './ViewAll'
import { getActivities } from 'intropath-core/actions/activity'

class LatestActivity extends React.Component {
  state = {
    activities: [],
  }

  componentWillMount() {
    if (!this.props.loaded) this.props.getActivities()
  }

  render() {
    const { latest: activities, loaded } = this.props

    if (!loaded || Object.keys(activities).length === 0) {
      return null
    }

    return (
      <div style={{ marginBottom: 14, marginTop: 15 }}>
        <Heading.H3>Latest Activity</Heading.H3>

        <div>
          {map(activities, (activities, time) => (
            <Activity key={time} time={time} activities={activities} />
          ))}

          {!Object.keys(activities).length && <EmptyState.Activity />}
        </div>

        {activities.length > 20 && (
          <ViewAll to="/introductions">View All</ViewAll>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.activity,
})

export default connect(
  mapStateToProps,
  { getActivities }
)(LatestActivity)
