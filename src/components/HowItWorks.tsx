import image_75f0fe1023929607e82dcb7a19c5c6616be59efb from 'figma:asset/75f0fe1023929607e82dcb7a19c5c6616be59efb.png';
import image_9780c49b2867f3570ec80d94af4a2e948e69da35 from 'figma:asset/9780c49b2867f3570ec80d94af4a2e948e69da35.png';
import image_74d28d6c628c48fb7f7d7cefdb42dc5a05b43b47 from 'figma:asset/74d28d6c628c48fb7f7d7cefdb42dc5a05b43b47.png';
import image_74d28d6c628c48fb7f7d7cefdb42dc5a05b43b47 from 'figma:asset/74d28d6c628c48fb7f7d7cefdb42dc5a05b43b47.png';
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
    image: image_74d28d6c628c48fb7f7d7cefdb42dc5a05b43b47
  },
  {
    number: "02",
    icon: Sparkles,
    title: "On lance le tirage",
    description: "Le tirage est géré par un smart contract et impossible à truquer.",
    date: "Le 28/12/25, à 20h (parfait !)",
    image: image_9780c49b2867f3570ec80d94af4a2e948e69da35
  },
  {
    number: "03",
    icon: Gift,
    title: "Gagne des cadeaux !",
    description: "Si ton numéro sort, tu peux le retirer. Tu peux cadeaux et montrer de la fierté.",
    date: "Dès le 30/12/25",
    image: image_75f0fe1023929607e82dcb7a19c5c6616be59efb
  }
];

export function HowItWorks() {
  return (
    <section className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="mb-16 space-y-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lime-400/30 bg-lime-400/10 backdrop-blur-sm">
            <span className="text-lime-400 text-sm">La loterie</span>
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
                className="relative bg-gradient-to-br from-lime-900/30 to-black overflow-hidden group hover:border-lime-400/10 transition-all duration-300 hover:shadow-xl hover:shadow-lime-400/10"
              >
                {/* Card Image */}
                <div className="relative w-full h-64 bg-gradient-to-br from-lime-900/20 to-black-900/20 mb-6">
                  <img 
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="px-8 pb-8">
                  {/* Step badge */}
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-black border border-lime-400/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    <span className="text-lime-400 text-sm">Étape {index + 1}</span>
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