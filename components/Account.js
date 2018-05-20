import React from "react"
import Link from "./Link"
import { Input, Label } from "./Form"
import { Button } from "./Button"

const Account = ({ user }) => {
  return (
    <div>
      <h3 className="mb-2">Konto</h3>
      <div className="md:flex md:items-center mb-2">
        <div className="md:w-1/3">
          <Label htmlFor="id">id</Label>
        </div>
        <div className="md:w-2/3">
          <Input disabled value={user.id} name="id" />
        </div>
      </div>
      <div className="md:flex md:items-center mb-2">
        <div className="md:w-1/3">
          <Label htmlFor="email">email</Label>
        </div>
        <div className="md:w-2/3">
          <Input value={user.email} name="id" />
        </div>
      </div>
      <div className="md:flex md:items-center mb-2">
        <div className="md:w-1/3">
          <Label htmlFor="stripe_user_id">stripe_user_id</Label>
        </div>
        <div className="md:w-2/3">
          {user.stripe_user_id ? (
            <Input value={user.stripe_user_id} name="id" />
          ) : (
            <Link
              href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${
                process.env.STRIPE_CLIENT_ID
              }&scope=read_write`}
            >
              <Button className="bg-grey-lighter w-full">Anslut Stripe</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Account
