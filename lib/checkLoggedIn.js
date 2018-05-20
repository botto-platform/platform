import gql from "graphql-tag"

export default (context, apolloClient) =>
  apolloClient
    .query({
      query: gql`
        query user {
          user {
            id
            email
            stripe_user_id
            livemode
            orders {
              id
              amount
              status
              metadata {
                status
              }
              # application
              # application_fee
              # charge
              # created
              currency
              # customer
              # email
              # metadata {
              #   status
              # }
              items {
                description
                quantity
              }
              livemode
            }
            products {
              id
              active
              name
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
        }
      `
    })
    .then(({ data: { user } }) => {
      return { user }
    })
    .catch(() => {
      // Fail gracefully
      return { user: {} }
    })
