import React from "react"
import gql from "graphql-tag"
import cookie from "cookie"
import { withApollo } from "react-apollo"
import withData from "../lib/withData"
import redirect from "../lib/redirect"
import checkLoggedIn from "../lib/checkLoggedIn"

import LandingLayout from "../layouts/Landing"

import Link from "../components/Link"
import { Button, PrimaryButton, GhostButton } from "../components/Button"
import { Input, Label } from "../components/Form"

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
    }
  }
`
class Signin extends React.Component {
  state = {}
  static async getInitialProps(context, apolloClient) {
    const { user } = await checkLoggedIn(context, apolloClient)

    if (user.id) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, "/")
    }

    return {}
  }

  signin(user) {
    const { client } = this.props

    return client
      .mutate({
        mutation: SIGN_IN,
        variables: user
      })
      .then(({ data }) => {
        console.log(data)

        document.cookie = cookie.serialize("token", data.signin.token, {
          maxAge: 30 * 24 * 60 * 60 // 30 days
        })
        // Force a reload of all the current queries now that the user is
        // logged in
        client.resetStore().then(() => redirect({}, "/"))
        return { user }
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: err.toString() })
        // Fail gracefully
        return err.toString()
      })
  }

  render() {
    return (
      <LandingLayout>
        <section className="p-8 bg-grey-lightest shadow-lg rounded mx-auto">
          <h1 className="text-center mb-4 text-grey-darkest text-2xl">
            Fyll i
          </h1>
          <form
            className="p-4"
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()

              const { email, password, submit } = e.target

              this.signin({
                email: email.value,
                password: password.value
              })

              email.value = password.value = ""
              submit.disabled = true
            }}
          >
            {this.state.error}
            <div className="md:flex md:items-center mb-2">
              <Input
                className="px-4 py-4"
                type="email"
                placeholder="Email"
                name="email"
              />
            </div>
            <div className="md:flex md:items-center mb-2">
              <Input
                className="px-4 py-4"
                type="password"
                placeholder="Lösenord"
                name="password"
              />
            </div>
            <PrimaryButton name="submit" type="submit" className="w-full">
              Logga in
            </PrimaryButton>
          </form>
          <p className="text-center pt-4">
            Inget konto? <Link href="/signup">Registrera dig här.</Link>
          </p>
        </section>
      </LandingLayout>
    )
  }
}

export default withData(withApollo(Signin))
