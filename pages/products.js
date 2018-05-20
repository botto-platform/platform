import React from "react"
import withDashboard from "../lib/withDashboard"
import gql from "graphql-tag"

import ProductCard from "../components/ProductCard"
import ProductTable from "../components/ProductTable"

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`
const Products = ({ client, user, ...props }) => {
  console.log("render products")

  const save = product => {
    console.log("save", product)
  }
  const remove = id => {
    console.log("remove", id)
    client.mutate({
      mutation: DELETE_PRODUCT,
      variables: { id }
    })
  }
  console.log(user && user.products)

  return (
    <div className="inline-flex flex-wrap">
      {/* <ProductTable products={user.products} /> */}
      {user &&
        user.products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onSave={save}
            onRemove={remove}
          />
        ))}
    </div>
  )
}
export default withDashboard(Products)
