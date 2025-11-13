import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Dashboard } from "./components/Dashboard";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Dashboard />
    </div>
  );
}