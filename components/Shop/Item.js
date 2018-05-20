import React from "react"
import { Button } from "../Button"

const CartButton = props => (
  <button
    className={
      "ml-1 w-12 h-12 px-0 m-0 border-2 rounded " +
      (props.disabled ? "border-grey" : "border-grey-darker")
    }
    {...props}
  />
)

const Item = ({ product, quantity, onInc, onDec }) => (
  <div className="bg-white mb-1 inline-flex w-full justify-between p-2 shadow border border-bg-grey-darkest">
    <div className="p-1 flex flex-col flex-1">
      <div className="flex flex-1 font-bold tracking-wide text-base">
        <div className="tracking-wide mr-2">{product.skus[0].price / 100}</div>
        <div className="mb-1 text-black">{product.name}</div>
      </div>
      <div>
        <div className="text-xs text-grey-darkest">
          {product.description.slice(0, 60)}...
        </div>
      </div>
    </div>
    <div className="flex items-center">
      <div className="inline-flex items-center">
        <CartButton disabled={quantity <= 0} onClick={_ => onDec(product)}>
          －
        </CartButton>
        <label className="text-xl text-grey-darkest font-bold px-2">
          {quantity}
        </label>
        <CartButton disabled={quantity >= 9} onClick={_ => onInc(product)}>
          ＋
        </CartButton>
      </div>
    </div>
  </div>
)

export default Item
