import { Wallet, Heart, Trophy, Shield, ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useState } from "react";

interface DonationPageProps {
  onHowItWorksClick: () => void;
  onAboutClick: () => void;
  onHomeClick: () => void;
}

export function DonationPage({ onHowItWorksClick, onAboutClick, onHomeClick }: DonationPageProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#E1B051]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#8A1C26]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl mb-6 drop-shadow-[0_0_30px_rgba(225,176,81,0.5)] pt-[40px] pr-[0px] pb-[0px] pl-[0px] text-[48px]">
              Faire un don
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-[16px]">
              Soutenir une cause caritative et participer à une loterie, c'est gagner à tous les niveaux
            </p>
          </motion.div>

          {/* Impact Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-[#E1B051]/10 to-[#C18F28]/10 border border-[#E1B051]/30 rounded-2xl p-6 text-center"
            >
              <Heart className="w-12 h-12 text-[#E1B051] mx-auto mb-4" />
              <div className="text-3xl mb-2">100%</div>
              <div className="text-gray-400">Pour la charité</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-[#6E0E1A]/10 to-[#8A1C26]/10 border border-[#8A1C26]/30 rounded-2xl p-6 text-center"
            >
              <Trophy className="w-12 h-12 text-[#8A1C26] mx-auto mb-4" />
              <div className="text-3xl mb-2">3 400</div>
              <div className="text-gray-400">Prix à gagner au total</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-[#E1B051]/10 to-[#C18F28]/10 border border-[#E1B051]/30 rounded-2xl p-6 text-center"
            >
              <Shield className="w-12 h-12 text-[#E1B051] mx-auto mb-4" />
              <div className="text-3xl mb-2">100%</div>
              <div className="text-gray-400">Transparent & Sécurisé</div>
            </motion.div>
          </div>

          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-black border border-[#E1B051]/20 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl mb-6 text-center">Choisissez votre montant</h2>
              
              {/* Predefined Amounts */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`relative p-4 rounded-xl transition-all duration-300 border-2 ${
                      selectedAmount === amount
                        ? 'border-[#E1B051] bg-[#E1B051]/10'
                        : 'border-gray-700 bg-gray-800/50 hover:border-[#E1B051]/50'
                    }`}
                  >
                    <div className="text-2xl">{amount}€</div>
                    {selectedAmount === amount && (
                      <Check className="absolute top-2 right-2 w-5 h-5 text-[#E1B051]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-8">
                <label className="block text-sm text-gray-400 mb-2">
                  Ou entrez un montant personnalisé
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || parseFloat(value) >= 0) {
                        setCustomAmount(value);
                        setSelectedAmount(null);
                      }
                    }}
                    placeholder="Montant personnalisé"
                    min="0.50"
                    step="0.1"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#E1B051] transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                </div>
              </div>

              {/* Donation Benefits */}
              <div className="bg-gradient-to-br from-green-400/20 to-black border border-[#E1B051]/20 rounded-xl p-6 mb-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E1B051]" />
                  Ce que vous obtenez
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#03BD6C] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Participation automatique à la loterie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#03BD6C] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">100% de votre don va directement à une associations caritatives partenaire de l'évènement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#03BD6C] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Reçu fiscal pour votre don (déduction d'impôts)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#03BD6C] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Transaction 100% sécurisée sur la blockchain</span>
                  </li>
                </ul>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-400 mb-4">Méthodes de paiement acceptées</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center gap-3 p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-[#E1B051]/50 transition-colors">
                    <Wallet className="w-6 h-6 text-[#E1B051]" />
                    <div className="text-left">
                      <div className="text-sm">Crypto Wallet</div>
                      <div className="text-xs text-gray-500">ETH uniquement</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                disabled={!selectedAmount && !customAmount}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C18F28] via-[#E1B051] to-[#C18F28] brightness-110 hover:scale-105 transition-all duration-300 text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="text-lg">
                  Faire un don {(selectedAmount || customAmount) ? `de ${selectedAmount || customAmount}€` : ''}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                En cliquant sur "Faire un don", vous acceptez nos conditions générales et notre politique de confidentialité.
              </p>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-[#03BD6C]" />
                <span className="text-sm">Paiement sécurisé SSL</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Check className="w-5 h-5 text-[#03BD6C]" />
                <span className="text-sm">100% Transparent</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Heart className="w-5 h-5 text-[#03BD6C]" />
                <span className="text-sm">100% reversé à la charité</span>
              </div>
            </div>
          </motion.div>

          {/* FAQ Mini Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl mb-[32px] text-center mt-[0px] mr-[0px] ml-[0px] pt-[64px] pr-[0px] pb-[0px] pl-[0px]">Questions fréquentes</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-900/80 to-black border border-[#E1B051]/20 rounded-xl p-6">
                <h3 className="text-lg mb-2 text-[#E1B051]">Puis-je faire un don sans participer à la loterie ?</h3>
                <p className="text-gray-400">
                  Non, chaque don vous inscrit automatiquement à la loterie. C'est notre façon de vous remercier pour votre générosité !
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-black border border-[#E1B051]/20 rounded-xl p-6">
                <h3 className="text-lg mb-2 text-[#E1B051]">Comment sont utilisés les fonds ?</h3>
                <p className="text-gray-400">
                  100% des dons vont directement aux associations caritatives ! Pas de frais cachés.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-black border border-[#E1B051]/20 rounded-xl p-6">
                <h3 className="text-lg mb-2 text-[#E1B051]">Est-ce que mon don est déductible des impôts ?</h3>
                <p className="text-gray-400">
                  Oui ! Vous recevrez un reçu fiscal vous permettant de déduire 66% de votre don de vos impôts.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer 
        onHowItWorksClick={onHowItWorksClick}
        onAboutClick={onAboutClick}
        onHomeClick={onHomeClick}
      />
    </div>
  );
}