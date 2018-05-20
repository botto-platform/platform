import React from "react"
import Link from "next/link"
// import { Package, LogOut, Settings, ShoppingCart } from "react-feather"
import { Button, PrimaryButton } from "../components/Button"

export default ({ children, onSignout }) => (
  <main className="h-screen text-grey-darkest bg-grey-lightest ">
    <section className="w-full flex justify-center">{children}</section>
  </main>
)
