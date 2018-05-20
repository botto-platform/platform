import React from "react"

import withData from "../lib/withData"
import { graphql, withApollo } from "react-apollo"
import gql from "graphql-tag"

import Shop from "../components/Shop"
const ShopPage = ({ products, ...rest }) => {
  console.log(products, rest)

  return (
    <div>
      <Shop products={products} />
    </div>
  )
}

ShopPage.getInitialProps = (context, apolloClient) => {
  console.log("getInitialProps", context, apolloClient)

  return {}
}
export default withData(
  graphql(
    gql`
      query Products {
        products {
          id
          name
          description
          active
          images
          skus {
            id
            active
            currency
            price
            inventory {
              type
              value
              quantity
            }
          }
        }
      }
    `,
    {
      props: ({ data }) => ({ ...data })
    }
  )(ShopPage)
)
