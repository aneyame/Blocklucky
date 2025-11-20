import { Coins, Music, DollarSign, Pizza, ShoppingBag, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

const initiatives = [
  {
    icon: Coins,
    title: "Une loterie ETH",
    description: "Pour financer les dons caritatifs, une loterie avec des cadeaux à gagner"
  },
  {
    icon: Music,
    title: "De la musique live",
    description: "Donnons de l'espace à nos artistes locaux aux côtés d'artistes renommés"
  },
  {
    icon: DollarSign,
    title: "Des dons reversés",
    description: "À nos écoles, au musée, aux pompiers, à des associations..."
  },
  {
    icon: Pizza,
    title: "Des food truck",
    description: "Pizza, spécialités portugaises, vin bordelais, et autres douceurs"
  },
  {
    icon: ShoppingBag,
    title: "Marché local",
    description: "Tenu par nos artisants et commerces locaux. Vous y trouverez de tout."
  },
  {
    icon: Zap,
    title: "Des partenariats",
    description: "La région, Revolut, SumUp, Etherbay FC, Les Marins d'EB, Elan, Sud'Ouest..."
  }
];

export function CharitySection() {
  return (
    <section className="relative bg-[#0D0D0D] text-white overflow-hidden py-24 px-16 pt-18px">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl" style={{
        backgroundColor: 'rgba(225, 176, 81, 0.1)'
      }} />

        <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm" style={{
            border: '1px solid rgba(225, 176, 81, 1)',
            background: 'linear-gradient(to right, rgba(193, 143, 40, 0.3), rgba(225, 176, 81, 0.3), rgba(193, 143, 40, 0.3))'
          }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(225, 176, 81, 1)' }} />
            <span className="font-medium text-sm" style={{ color: 'rgba(225, 176, 81, 1)' }}>L'événement</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white max-w-3xl mx-auto">
            Une œuvre de charité pour notre ville
          </h2>
        </motion.div>

        {/* Initiatives grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
              >
                <Card className="relative bg-black/50 group hover:border-gray-900/10 transition-all duration-300 hover:scale-95 p-8 h-full">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6" style={{
                    border: '1px solid rgba(225, 176, 81, 1)',
                    background: 'linear-gradient(to bottom left, rgba(225, 176, 81, 0.4), rgba(193, 143, 40, 0.3))'
                  }}>
                    <Icon className="w-7 h-7" stroke="rgba(225, 176, 81, 1)" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl text-white mb-3">{initiative.title}</h3>
                  <p className="text-gray-400">{initiative.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}