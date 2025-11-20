import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqData = [
  {
    id: "01",
    question: "C'est quoi la loterie d'Etherbay ?",
    answer: "C'est une grande loterie organisée par la mairie d'Etherbay pour soutenir les projets locaux : écoles, pompiers, musée, associations...\nTout le monde peut participer, et tous les dons sont reversés à la ville ou des associations."
  },
  {
    id: "02",
    question: "Comment je participe ?",
    answer: "Il suffit de faire un don supérieur à 0.001 ETH !\nChaque don te donne automatiquement un billet numérique pour le tirage.\nPlus ton don est généreux, plus tu multiplies tes chances !"
  },
  {
    id: "03",
    question: "Pourquoi en crypto ?",
    answer: "Parce que la crypto rend tout transparent, rapide et automatique.\nChaque don est enregistré sur la blockchain : pas d'intermédiaires, pas de triche.\nTu peux même vérifier ton billet toi-même.\nÉgalement pour initier nos etherbaisais à la cryptomonnaie sans risque et de manière fun !"
  },
  {
    id: "04",
    question: "Et si je n'y connais rien en crypto ?",
    answer: "Pas de panique !\nOn t'explique tout simplement comment créer ton wallet, envoyer ton don et suivre ton billet.\nAucune connaissance technique n'est nécessaire, tout est guidé étape par étape.\nPour ça direction la page 👉 Comment ça marche"
  },
  {
    id: "05",
    question: "Quand a lieu le tirage ?",
    answer: "Le tirage aura lieu en direct pendant l'événement à Etherbay !\nIl y aura des animations, de la musique, des stands, et bien sûr... les grands gagnants 🎉"
  },
  {
    id: "06",
    question: "Qu'est-ce qu'on peut gagner ?",
    answer: "Des cadeaux offerts par les commerçants et partenaires d'Etherbay, remis sur place pendant l'événement.\nLe vrai gain ? Soutenir ta ville tout en t'amusant."
  },
  {
    id: "07",
    question: "Où vont les fonds collectés ?",
    answer: "Tous les fonds collectés vont directement à la ville d'Etherbay ou aux associations locales pour financer des projets concrets : rénovation d'infrastructures, soutien aux associations, événements culturels, etc."
  }
];

export function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(prev => prev === id ? null : id);
  };

  return (
    <section className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl" style={{
        backgroundColor: 'rgba(110, 14, 26, 0.2)'
      }} />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex md:flex-row md:items-start justify-between gap-6 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl text-white leading-tight">
              Des questions ?<br />
              On a des réponses.
            </h2>
          </div>
          <div className="text-gray-400 md:text-right">
            <p className="text-gray-400 mb-2">
              Ici la section FAQ. Pour plus<br />
              d'informations :
            </p>
            <button className="inline-flex items-center gap-2 transition-colors group" style={{
              color: 'rgba(225, 176, 81, 1)'
            }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(193, 143, 40, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'}>
              <span>Nous contacter</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item) => {
            const isOpen = openItem === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.5), rgba(0, 0, 0, 1))',
                  border: '1px solid rgba(79, 7, 8, 0.5)'
                }}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-start justify-between gap-4 p-6 md:p-8 text-left transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(193, 143, 40, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="flex items-center gap-6 md:gap-8 flex-1">
                    <span className="flex-shrink-0" style={{ color: 'rgba(225, 176, 81, 1)' }}>{item.id}</span>
                    <h3 className="text-white text-lg md:text-xl flex-1">
                      {item.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5" style={{ color: 'rgba(225, 176, 81, 1)' }} />
                    ) : (
                      <Plus className="w-5 h-5" style={{ color: 'rgba(225, 176, 81, 1)' }} />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 md:pl-20">
                        <p className="text-gray-400 whitespace-pre-line leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}