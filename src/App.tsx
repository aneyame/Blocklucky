import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { CharitySection } from "./components/CharitySection";
import { Dashboard } from "./components/Dashboard";
import { CryptoComparison } from "./components/CryptoComparison";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <HowItWorks />
      <CharitySection />
      <Dashboard />
      <CryptoComparison />
    </div>
  );
}