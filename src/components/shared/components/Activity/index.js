import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const StyledActivity = styled.div`
  border-bottom: 1px solid #dfe1e7;
  min-height: 80px;
  color: #000000;
  padding: 12px 12px 18px 12px;
  display: flex;
  font-size: 14px;
`

const Time = styled.div`
  flex: 1;
  opacity: 0.42;
  font-size: 14px;
`

const Activities = styled.div`
  flex: 3;
  a,
  a:hover {
    color: #000000;
    text-decoration: none;
  }
`

const Activity = ({ date, time, activities }) => (
  <StyledActivity>
    <Time>
      <div>{date}</div>
      <div>{time}</div>
    </Time>
    <Activities>
      {activities.map((activity, index) => (
        <Link
          to={`/introductions/${activity.intro_id}`}
          key={`${activity.intro_id}-${activity.time}-${index}`}
        >
          <div
            dangerouslySetInnerHTML={{ __html: activity.text }}
            style={{ marginBottom: 10 }}
          />
        </Link>
      ))}
    </Activities>
  </StyledActivity>
)

const mapStateToProps = (_, { time }) => {
  const d = time.split(/\s(.+)/)

  return {
    time: d[1],
    date: d[0],
  }
}

export default connect(mapStateToProps)(Activity)
