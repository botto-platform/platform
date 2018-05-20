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
import { Checkbox, Input, Label } from "../components/Form"

const SIGN_IN = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`
class Signup extends React.Component {
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

  signup(user) {
    const { client } = this.props

    return client
      .mutate({
        mutation: SIGN_IN,
        variables: user
      })
      .then(({ data }) => {
        document.cookie = cookie.serialize("token", data.signup.token, {
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
          <h1 className="text-center text-grey-darkest text-2xl mb-4">
            Kör igång!
          </h1>
          <form
            className="p-4"
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()

              const { email, password, submit } = e.target

              this.signup({
                email: email.value,
                password: password.value
              })

              email.value = password.value = ""
              submit.disabled = true
            }}
          >
            {this.state.error && <p>No user found with that information.</p>}
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
            <div className="md:flex md:items-center mb-2">
              <label className="flex items-center py-4">
                <Checkbox className="mr-2" name="agree" />
                <Link href="/terms">Jag accepterar & godkänner avtalet</Link>
              </label>
            </div>
            <PrimaryButton name="submit" type="submit" className="w-full">
              Registrera
            </PrimaryButton>
          </form>
          <p className="text-center pt-4">
            Har du redan ett konto? <Link href="/signin">Logga in</Link>
          </p>
        </section>
      </LandingLayout>
    )
  }
}

export default withData(withApollo(Signup))
