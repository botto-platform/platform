import React from "react"
import Link from "../components/Link"
import { Button, PrimaryButton } from "../components/Button"

const images = [
  "https://images.pexels.com/photos/221357/pexels-photo-221357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/633017/pexels-photo-633017.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/375889/pexels-photo-375889.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/417003/pexels-photo-417003.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/104884/pexels-photo-104884.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/693267/pexels-photo-693267.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/5317/food-salad-restaurant-person.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/439851/pexels-photo-439851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
]
export default ({ children, onSignout }) => (
  <main className="h-screen text-grey-darkest bg-grey-lightest ">
    <header className="flex flex-1 p-2 justify-between items-center shadow-lg">
      <Link href="/landing">
        <button className="px-4 text-grey-darkest text-3xl font-bold">
          b0tt0
        </button>
      </Link>
      <div>
        <Link href="/signin">
          <Button className="">Logga in</Button>
        </Link>
        <Link href="/signup">
          <PrimaryButton>Registrera</PrimaryButton>
        </Link>
      </div>
    </header>
    <div
      className="absolute w-full h-full z-0"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${images[~~(Math.random() * images.length)]})`
      }}
    />
    <section className="p-8 mt-8 z-10 relative w-full flex">{children}</section>
  </main>
)
