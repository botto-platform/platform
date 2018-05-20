import React from "react"
import withDashboard from "../lib/withDashboard"

const panes = [
  "created",
  "paid",
  "processing",
  "pickup_available",
  "fulfilled" /* "returned", "canceled" */
]
const Orders = ({ user }) => {
  return (
    <div className="flex ">
      {panes.map(status => (
        <div className="w-1/3 -mx-2 p-4">
          <h3>{status}</h3>
          {user.orders.filter(o => o.status === status).map(order => {
            console.log(order)
            return (
              <div className="mb-2 p-4 bg-grey-light">
                {/* <div>{order.id}</div> */}
                <div>
                  {order.items.filter(i => i.quantity).map(item => (
                    <div>
                      {item.description} {item.quantity}
                    </div>
                  ))}
                </div>
                <div>
                  {(order.amount / 100).toLocaleString("sv-SE", {
                    style: "currency",
                    currency: order.currency
                  })}
                </div>
                <div>{order.status}</div>
                {order.metadata.status}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
export default withDashboard(Orders)
