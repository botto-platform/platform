import { Mutation, withApollo } from "react-apollo"
import gql from "graphql-tag"
import cookie from "cookie"
import redirect from "../lib/redirect"

import Button from "./Button"
const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
    }
  }
`

// TODO: Find a better name for component.
const SigninBox = ({ error, onSubmit }) => {
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()

          const { email, password } = e.target

          onSubmit({
            email: email.value,
            password: password.value
          })

          email.value = password.value = ""
        }}
      >
        {error && <p>No user found with that information.</p>}
        <input
          name="email"
          placeholder="Email"
          // ref={node => {
          //   email = node
          // }}
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          // ref={node => {
          //   password = node
          // }}
          type="password"
        />
        <br />
        <Button>Sign in</Button>
      </form>
    </div>
  )
}

export default withApollo(SigninBox)
