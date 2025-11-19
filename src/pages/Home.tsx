import { Hero } from "../components/Hero"
import { HowItWorks } from "../components/HowItWorks"
import { CharitySection } from "../components/CharitySection"
import { Dashboard } from "../components/Dashboard"
import { CryptoComparison } from "../components/CryptoComparison"

export function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <CharitySection />
      <Dashboard />
      <CryptoComparison />
    </>
  )
}
