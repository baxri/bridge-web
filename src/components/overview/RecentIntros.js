import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { sortBy } from 'lodash'

import { Heading, Intro, EmptyState } from 'components/shared'
import ViewAll from './ViewAll'

const RecentIntros = ({ introductions, history, hasMore }) => {
  if (introductions.length === 0) {
    return null
  }

  return (
    <div style={{ marginBottom: 14, marginTop: 15 }}>
      <Heading.H3>Recent Intros</Heading.H3>

      <div>
        {introductions.map(intro => (
          <Intro
            key={intro.id}
            onClick={() => history.push(`/introductions/${intro.id}`)}
            expanded={false}
            {...intro}
          />
        ))}

        {!introductions.length && <EmptyState.RecentIntro />}
      </div>

      {hasMore && <ViewAll to="/introductions">View All</ViewAll>}
    </div>
  )
}

const enhance = compose(
  withRouter,
  connect((state, { introductions }) => ({
    introductions: sortBy(introductions, i => i.updated_at)
      .reverse()
      .slice(0, 10),
    hasMore: introductions.length > 10,
  }))
)

export default enhance(RecentIntros)
