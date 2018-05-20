import React from "react"
import { Package, LogOut, Settings, ShoppingCart } from "react-feather"

import Link from "next/link"
import { Button, PrimaryButton } from "../components/Button"

const Menu = props => <ul className="list-reset p-0" {...props} />
const Item = ({ href, ...props }) => {
  const item = (
    <li
      className="lowercase p-6 tracking-wide font-bold text-grey-dark text-base hover:bg-grey-darkest hover:text-white cursor-pointer inline-flex items-center w-full justify-between"
      {...props}
    />
  )
  return href ? <Link href={href}>{item}</Link> : item
}

export default ({ children, onSignout, path, ...props }) => {
  console.log(path)

  return (
    <main className="h-screen text-black bg-grey-lightest ">
      <header className="flex flex-1 p-2 items-center bg-black text-white shadow-lg">
        <Link href="/landing">
          <button className="px-4 text-grey-darkest text-3xl font-bold">
            b0tt0
          </button>
        </Link>
        <div>
          <Link href="/">
            <Button
              className={
                path === "/" ? "font-bold text-white" : "text-grey-dark"
              }
            >
              Översikt
            </Button>
          </Link>
          <Link href="/products">
            <Button
              className={
                path === "/products" ? "font-bold text-white" : "text-grey-dark"
              }
            >
              Produkter
            </Button>
          </Link>
          <Link href="/orders">
            <Button
              className={
                path === "/orders" ? "font-bold text-white" : "text-grey-dark"
              }
            >
              Orderhantering
            </Button>
          </Link>
          <Link href="/shop">
            <Button
              className={
                path === "/shop" ? "font-bold text-white" : "text-grey-dark"
              }
            >
              Shop
            </Button>
          </Link>
        </div>
        <Button className="ml-auto text-grey-dark" onClick={onSignout}>
          Logga ut
        </Button>
      </header>

      <section className="w-full px-4 py-1">{children}</section>
    </main>
  )
}
