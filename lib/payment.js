import React from "react"

function checkoutCart(cart) {
  const items = Object.values(cart)
  const currency = items[0].currency
  const amount = items.reduce((sum, x) => sum + x.amount, 0)

  return { amount, currency, items }
}

export function createPayment(cart) {
  const order = checkoutCart(cart)
  console.log(order)
  return new Promise((resolve, reject) => {
    const paymentRequest = window
      .Stripe(process.env.STRIPE_PUBLIC_KEY)
      .paymentRequest({
        country: "SE",
        currency: order.currency,
        total: {
          label: "Total",
          amount: order.amount
        },
        requestPayerEmail: true,
        //   requestShipping: true,
        //   shippingType: "pickup",
        displayItems: order.items.map(renderOrderLine)
      })

    paymentRequest.on("source", async event => {
      console.log("source: ", event, order)

      if (await paymentRequest.canMakePayment()) {
        return resolve({ order, source })
      }
      reject({ error: "Payment request failed", event })
    })
  })
}

function renderOrderLine(item) {
  return {
    label: `${item.description} (x${item.quantity})`,
    amount: item.amount * item.quantity
  }
}
