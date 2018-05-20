import "isomorphic-unfetch"
import React from "react"
import { graphql } from "react-apollo"
import { gql } from "apollo-boost"

import redirect from "../lib/redirect"
import withData from "../lib/withData.js"

const connect = gql`
  mutation connect($code: String!) {
    connect(code: $code)
  }
`

class Connect extends React.Component {
  componentDidMount() {
    console.log(this.props)
    const { connect, url } = this.props

    connect(url.query.code)
      .then(res => {
        console.log(res)
        return redirect({}, "/")
      })
      .catch(err => console.log(err))
  }
  render() {
    return <div>laddar...</div>
  }
}

export default withData(
  graphql(connect, {
    props: ({ ownProps, mutate }) => ({
      connect: code =>
        mutate({
          variables: { code }
        })
    })
  })(Connect)
)
