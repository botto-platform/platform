import React from "react"
import cookie from "cookie"
import { withApollo } from "react-apollo"

import checkLoggedIn from "./checkLoggedIn"
import withData from "./withData"
import redirect from "./redirect"

import Layout from "../layouts/Dashboard"

const withDashboard = Component =>
  withData(
    withApollo(
      class WithDashboard extends React.Component {
        static async getInitialProps(context, apolloClient) {
          const { user } = await checkLoggedIn(context, apolloClient)
          console.log(user)

          if (!user.id) {
            // If not signed in, send them somewhere more useful
            redirect(context, "/signin")
          }
          return { user }
        }

        signout = () => {
          document.cookie = cookie.serialize("token", "", {
            maxAge: -1 // Expire the cookie immediately
          })

          // Force a reload of all the current queries now that the user is
          // logged in, so we don't accidentally leave any state around.
          this.props.client.cache.reset().then(() => {
            // Redirect to a more useful page when signed out
            redirect({}, "/signin")
          })
        }

        render() {
          console.log(this.props)

          return (
            <Layout onSignout={this.signout} path={this.props.url.pathname}>
              <Component {...this.props} />
            </Layout>
          )
        }
      }
    )
  )

export default withDashboard
