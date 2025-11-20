import { CheckCircle2, XCircle } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";

const euroProblems = [
  "Billets papier et suivi manuel",
  "Paiements lents et frais cachés",
  "Tirage opaque, confiance limitée",
  "Risque d'erreur ou de manipulation",
  "Organisation compliquée, beaucoup d'intermédiaires"
];

const ethereumBenefits = [
  "Billets numériques sécurisés sur la blockchain",
  "Transactions instantanées, sans frais surprises",
  "Tirage automatisé, vérifiable par tous",
  "Code transparent, impossible à tricher",
  "Processus simple, fluide et 100% automatisé"
];

export function CryptoComparison() {
  return (
    <section className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{
        backgroundColor: 'rgba(225, 176, 81, 0.05)'
      }} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="mb-16 space-y-6 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm" style={{
            border: '1px solid rgba(193, 143, 40, 1)',
            background: 'linear-gradient(to right, rgba(193, 143, 40, 0.1), rgba(225, 176, 81, 0.1), rgba(193, 143, 40, 0.1))'
          }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(225, 176, 81, 1)' }} />
            <span className="text-sm" style={{ color: 'rgba(225, 176, 81, 1)' }}>Pourquoi en crypto ?</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white max-w-3xl mx-auto">
            Il y a une meilleure façon de gérer la loterie
          </h2>
        </motion.div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Euro column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="relative border-red-500/20 p-8 h-full" style={{
              background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))'
            }}>
              <h3 className="text-2xl text-white mb-8"> €  Euro</h3>
              <div className="space-y-4">
                {euroProblems.map((problem, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400">{problem}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Ethereum column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="relative border-green-400/30 p-8 h-full" style={{
              background: 'linear-gradient(to bottom right, rgba(74, 222, 128, 0.2), rgba(0, 0, 0, 1))'
            }}>
              {/* Ethereum logo icon */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M12 2L5 12.5L12 16.5L19 12.5L12 2Z" fill="rgba(225, 176, 81, 1)" />
                    <path d="M5 13.5L12 22L19 13.5L12 17.5L5 13.5Z" fill="rgba(193, 143, 40, 1)" />
                  </svg>
                </div>
                <h3 className="text-2xl text-white">Ethereum</h3>
              </div>
              <div className="space-y-4">
                {ethereumBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}