import React from "react"

const Td = ({ className, ...props }) => (
  <div className={"p-2 border-grey-dark " + className} {...props} />
)
const Form = props => (
  <form
    className="inline-flex flex-1 w-full items-center border border-grey-light mb-2"
    {...props}
  />
)
const Checkbox = props => (
  <input type="checkbox" className="w-6 h-6" {...props} />
)
const Select = ({ className, ...props }) => (
  <select
    className={
      "bg-grey-lighter border-2 border-grey-lighter rounded py-2 px-4 text-grey-darker " +
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
const Label = props => (
  <label
    className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
    {...props}
  />
)
const Row = ({ active, id, name, images, skus }) => {
  console.log(skus)
  const sku = skus[0]
  return (
    <Form>
      <Td className="w-1/4">{id}</Td>
      <Td className="w-1/4">{name}</Td>
      <Td className="w-1/4 inline-flex w-full items-center">
        <label className="pr-2">SKU</label>
        <Select className="w-48">
          {skus.map(sku => {
            return <option>{sku.id}</option>
          })}
        </Select>
      </Td>
      <Td className="w-1/4">
        <Form>
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
        </Form>
      </Td>
      <Td className="inline-flex items-center">
        <Checkbox
          id={`active[${id}]`}
          name={`active[${id}]`}
          defaultValue={active}
        />
        <label htmlFor={`active[${id}]`} className="pl-2">
          active
        </label>
      </Td>
    </Form>
  )
}
const ProductTable = ({ products = [] }) => (
  <div>{products.map(product => <Row key={product.id} {...product} />)}</div>
)

export default ProductTable
