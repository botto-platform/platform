import React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import { compose, mapProps, withStateHandlers } from "recompose"
import { Button, PrimaryButton } from "../Button"
import { createPayment } from "../../lib/payment"

import Item from "./Item"

const Shop = ({
  cart,
  onInc,
  onDec,
  error,
  loading,
  vendor,
  products = [],
  createOrder,
  payOrder,
  ...rest
}) => {
  return (
    <div className="flex flex-col h-screen justify-between bg-grey-lighter p-1">
      <div>
        {products
          .filter(p => p.skus.length)
          .map(p => (
            <Item
              quantity={(cart[p.id] || {}).quantity || 0}
              product={p}
              onInc={onInc}
              onDec={onDec}
            />
          ))}
      </div>
      <PrimaryButton
        className="w-full text-xl"
        onClick={_ =>
          createPayment(cart).then(({ order, source }) =>
            createOrder({ variables: { ...order, vendor } }).then(({ id }) =>
              payOrder({ variables: { id, source } })
            )
          )
        }
      >
        Till betalning
      </PrimaryButton>
    </div>
  )
}

const CREATE_ORDER = gql`
  mutation CreateOrder(
    $vendor: String!
    $email: String!
    $currency: Currency
    $items: [InputItem!]!
  ) {
    createOrder(
      vendor: $vendor
      email: $email
      currency: $currency
      items: $items
    ) {
      amount
      application
      application_fee
      charge
      # created
      currency
      customer
      email
      items {
        amount
        currency
        description
        parent
        quantity
        type
      }
      status
      metadata
      livemode
    }
  }
`
const PAY_ORDER = gql`
  mutation PayOrder(
    $vendor: String!
    $email: String!
    $currency: Currency
    $items: [InputItem!]!
  ) {
    payOrder(
      vendor: $vendor
      email: $email
      currency: $currency
      items: $items
    ) {
      amount
      application
      application_fee
      charge
      # created
      currency
      customer
      email
      items {
        amount
        currency
        description
        parent
        quantity
        type
      }
      status
      metadata
      livemode
    }
  }
`
export default compose(
  graphql(CREATE_ORDER, { name: "createOrder" }),
  graphql(PAY_ORDER, { name: "payOrder" })
)(
  withStateHandlers(
    { cart: {} },
    {
      onInc: add(1),
      onDec: add(-1),
      onReset: state => _ => ({ cart: {} })
    }
  )(Shop)
)

function add(val) {
  return state => product => {
    const id = product.id
    const sku = product.skus[0]
    return {
      cart: {
        ...state.cart,
        [id]: {
          amount: sku.price,
          parent: sku.id,
          currency: sku.currency,
          type: "sku",
          description: product.name,
          quantity: ((state.cart[id] || {}).quantity || 0) + val
        }
      }
    }
  }
}
