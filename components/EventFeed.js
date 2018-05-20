import React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

const EventFeed = ({ events = [] }) => {
  return (
    <div>
      <h3 className="mb-2">Händelseflöde</h3>
      {events.map(event => (
        <div className="flex justify-between">
          <div>{event.type}</div>
          <div>{new Date(event.created * 1000).toISOString()}</div>
        </div>
      ))}
    </div>
  )
}

export default graphql(
  gql`
    query Events {
      events {
        id
        created
        livemode
        type
      }
    }
  `,
  {
    props: ({ data }) => ({ ...data })
  }
)(EventFeed)
