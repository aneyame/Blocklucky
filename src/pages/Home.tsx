import { Hero } from "../components/Hero"
import { HowItWorks } from "../components/HowItWorks"
import { CharitySection } from "../components/CharitySection"
import { Dashboard } from "../components/Dashboard"
import { CryptoComparison } from "../components/CryptoComparison"
import { FAQ } from "../components/FAQ"
import { Timeline } from "../components/Timeline"
import { ContactForm } from "../components/ContactForm"
import { CTASection } from "../components/CTASection"
import { Footer } from "../components/Footer"


export function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <CharitySection />
      <Dashboard />
      <CryptoComparison />
      <FAQ />
      <Timeline />
      <ContactForm />
      <CTASection />
      <Footer 
        onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </>
  )
}
