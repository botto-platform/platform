import React from "react"

import NoSSR from "react-no-ssr"
import withDashboard from "../lib/withDashboard"
import Link from "../components/Link"

import Account from "../components/Account"
import EventFeed from "../components/EventFeed"

const Index = ({ user }) => (
  <div className="flex flex-wrap text-grey-darker">
    <div className="md:w-1/2 p-4 ">
      <EventFeed />
    </div>
    <div className="md:w-1/2 p-4 ">
      <Account user={user} />
    </div>
  </div>
)

export default withDashboard(Index)
