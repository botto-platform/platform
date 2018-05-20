import React from "react"
import Link from "next/link"
import LandingLayout from "../layouts/Landing"
import { Button, PrimaryButton } from "../components/Button"

const Landing = () => (
  <LandingLayout>
    <section className="p-8 bg-grey-lightest max-w-md shadow-lg rounded">
      <h1 className="mb-8 text-4xl">En e-handel-plattform</h1>
      <h3 className="text-xl font-light mb-8">
        Skapa produkter, hantera inkommande ordrar och notifiera dina kunder
        automatiskt vid order-förändringar.
      </h3>
      <h3 className="text-xl font-light mb-8">
        Maskinintelligens hjälper dig fatta smarta beslut beroende på vad dina
        kunder vill ha.
      </h3>
      <div className="inline-flex flex-1 justify-around w-full">
        <Link href="/signup">
          <PrimaryButton>Börja använda b0tt0!</PrimaryButton>
        </Link>
        <Link href="/landing">
          <Button className="border-2 border-grey-darker">
            Hur funkar det?
          </Button>
        </Link>
      </div>
    </section>
  </LandingLayout>
)

export default Landing
