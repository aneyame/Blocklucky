import image_63c51e1634b770e2dcb9bae83b54f7ccc125fa11 from '../assets/63c51e1634b770e2dcb9bae83b54f7ccc125fa11.png';
import image_d9e10532043ca2dcc119f5da055bdafa448bc5f6 from '../assets/d9e10532043ca2dcc119f5da055bdafa448bc5f6.png';
import image_244e822cb06c8f6ee64dd839b1f487f8460d4a65 from '../assets/244e822cb06c8f6ee64dd839b1f487f8460d4a65.png';
import { Wallet, Sparkles, Gift } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Prends ton billet",
    description: "Achète ton billet avec des Ethers sur la blockchain et reçois un ticket blockchain.",
    date: "Du 11 au 30/11/25",
    image: image_244e822cb06c8f6ee64dd839b1f487f8460d4a65
  },
  {
    number: "02",
    icon: Sparkles,
    title: "On lance le tirage",
    description: "Le tirage est géré par un smart contract et impossible à truquer.",
    date: "Le 28/12/25, à 20h (parfait !)",
    image: image_d9e10532043ca2dcc119f5da055bdafa448bc5f6
  },
  {
    number: "03",
    icon: Gift,
    title: "Gagne des cadeaux !",
    description: "Si ton numéro sort, bravo ! Ensuite à toi de venir le chercher sur place.",
    date: "Dès le 30/12/25",
    image: image_63c51e1634b770e2dcb9bae83b54f7ccc125fa11
  }
];

export function HowItWorks() {
  return (
    <section className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E1B051]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="mb-16 space-y-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C18F28] bg-gradient-to-r from-[#C18F28]/10 via-[#E1B051]/10 to-[#C18F28]/10 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E1B051]" />
            <span className="text-[#E1B051] text-sm">La loterie</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white">Comment ça fonctionne</h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                ease: "easeOut" 
              }}
            >
              <Card 
                className="relative bg-gradient-to-br from-gray-900/80 to-black border border-[#E1B051]/8 overflow-hidden group hover:border-[#E1B051]/10 transition-all duration-300 hover:shadow-xl hover:shadow-[#E1B051]/10"
              >
                {/* Card Image */}
                <div className="relative w-full h-64 bg-gradient-to-br from-[#C18F28]/20 to-black-900/20 mb-6">
                  <img 
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="px-8 pb-8">
                  {/* Step badge */}
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-black border border-[#C18F28]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E1B051]" />
                    <span className="text-[#E1B051] text-sm">Étape {index + 1}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  <p className="text-gray-500 text-sm">{step.date}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}