import React from "react"
import Link from "next/link"

const Td = props => <td {...props} />
const Tr = props => <tr {...props} />
const Label = props => (
  <label
    className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
    {...props}
  />
)
const Select = ({ className, ...props }) => (
  <select
    className={
      "bg-grey-lighter border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker " +
      className
    }
    {...props}
  />
)
const Input = ({ className, ...props }) => (
  <input
    className={
      "bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker " +
      className
    }
    {...props}
  />
)
const Textarea = ({ className, ...props }) => (
  <textarea
    className={
      "bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker " +
      className
    }
    {...props}
  />
)

const Button = ({ className, ...props }) => (
  <button
    className={
      "font-bold bg-grey-lighter hover:bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker " +
      className
    }
    {...props}
  />
)

const ProductCard = ({ product, onSave, onRemove }) => {
  const sku = product.skus[0]
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-2 flex flex-col">
      <img
        className="w-full"
        src="https://tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />

      <div className="flex flex-col justify-between flex-1 p-2">
        <form
          onSubmit={e => {
            // console.log("submit")

            e.preventDefault()
            const {
              name,
              description
              //   selectedSKU,
              //   price,
              //   type,
              //   quantity
            } = e.target
            // console.log(name, description, selectedSKU, price, type, quantity)

            const patch = {
              //   skuID: selectedSKU.value,
              name: name.value,
              description: description.value
              //   price: price.value,
              //   type: type.value
            }

            // const sku = {
            //   id: selectedSKU.value,
            //   price: price.value,
            //   inventory: {
            //     quantity: quantity.value,
            //     type: type.value
            //   }
            // }

            console.log(patch)

            onSave({ ...patch, id: product.id })

            // console.log(sku)
          }}
        >
          <Input
            className="font-bold text-lg mb-2"
            name="name"
            value={product.name}
          />
          <Textarea
            className="mb-2"
            name="description"
            placeholder="Description..."
          >
            {product.description}
          </Textarea>
          <div className="md:flex md:items-center mb-2">
            <div className="md:w-1/3">
              <Label htmlFor="selectedSKU">SKUs</Label>
            </div>
            <div className="md:w-2/3">
              <Select value={sku && sku.id} name="selectedSKU">
                {product.skus.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.id}
                  </option>
                ))}
                <option>Create new</option>
              </Select>
            </div>
          </div>

          {sku && (
            <div>
              <div className="md:flex md:items-center mb-2">
                <div className="md:w-1/3">
                  <Label htmlFor="price">Price</Label>
                </div>
                <div className="md:w-2/3">
                  <Input type="number" value={sku.price} name="price" />
                </div>
              </div>

              <div className="md:flex md:items-center mb-2">
                <div className="md:w-1/3">
                  <Label htmlFor="type">Inventory</Label>
                </div>
                <div className="md:w-2/3">
                  <Select value={sku.inventory.type} name="type">
                    {["finite", "infinite"].map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              {sku.inventory.type === "finite" && (
                <div className="md:flex md:items-center mb-2">
                  <div className="md:w-1/3">
                    <Label>Stock</Label>
                  </div>
                  <div className="md:w-2/3">
                    <Input value={sku.inventory.quantity} />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="inline-flex w-full">
            <Button className="flex-1 rounded-l" type="submit">
              Save
            </Button>
            <Button className="flex-1">Stats</Button>
            <Link href={"/simulate?product=" + product.id}>
              <Button className="flex-1">Simulate</Button>
            </Link>
            <Button
              className="flex-1 rounded-r"
              onClick={_ => onRemove(product.id)}
            >
              X
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductCard
