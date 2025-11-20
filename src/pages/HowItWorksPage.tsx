import { Wallet, Shield, Coins, Globe, Download, Key, CheckCircle } from "lucide-react";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";

interface HowItWorksPageProps {
  onAboutClick: () => void;
  onHomeClick: () => void;
  onDonationClick?: () => void;
}

export function HowItWorksPage({ onAboutClick }: HowItWorksPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{height : '140px'}}>

      </div>

      {/* Main Content */}
      <motion.div 
        className="max-w-6xl mx-auto px-6 py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title Section */}
        <motion.div 
          className="text-center mb-16 space-y-6 pt-[0px] pr-[0px] pb-[15px] pl-[0px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl bg-white brightness-110 bg-clip-text text-transparent pt-[37px] pr-[0px] pb-[0px] pl-[0px]">
            Comment ça marche ?
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto text-[16px]">
            Pas de panique ! On vous explique tout simplement, sans les termes super technique.
          </p>
        </motion.div>

        {/* Crypto Explanation Section */}
        <motion.div 
          className="mb-20 pt-[23px] pr-[0px] pb-[0px] pl-[0px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-4xl mb-8 text-center">Comprendre la cryptomonnaie</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* What is Crypto */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="relative rounded-2xl p-8 backdrop-blur-sm h-full" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', border: '1px solid rgba(225, 176, 81, 0.2)' }}>
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))' }}>
                  <Coins className="w-8 h-8" style={{ color: 'rgba(0, 0, 0, 1)' }} />
                </div>
                <h3 className="text-2xl mb-4">C'est quoi exactement ?</h3>
                <p className="text-gray-400 leading-relaxed">
                  La cryptomonnaie, c'est de l'argent numérique. Comme les euros dans votre compte bancaire, mais sans banque ! 
                  C'est vous qui contrôlez totalement votre argent. La plus connue s'appelle <span style={{ color: 'rgba(225, 176, 81, 1)' }}>Bitcoin</span>, 
                  mais nous on utilise l'<span style={{ color: 'rgba(225, 176, 81, 1)' }}>Ethereum (ETH)</span>.
                </p>
              </div>
            </motion.div>

            {/* Why Crypto */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="relative rounded-2xl p-8 backdrop-blur-sm h-full" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', border: '1px solid rgba(138, 28, 38, 0.3)' }}>
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 1), rgba(138, 28, 38, 1))' }}>
                  <Shield className="w-8 h-8" style={{ color: 'rgba(255, 255, 255, 1)' }} />
                </div>
                <h3 className="text-2xl mb-4">Pourquoi c'est sécurisé ?</h3>
                <p className="text-gray-400 leading-relaxed">
                  Toutes les transactions sont enregistrées sur la <span style={{ color: 'rgba(138, 28, 38, 1)' }}>blockchain</span> - 
                  c'est comme un grand livre de comptes public que personne ne peut modifier ou falsifier. 
                  C'est transparent, vérifiable et ultra-sécurisé !
                </p>
              </div>
            </motion.div>

            {/* How it works */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="relative rounded-2xl p-8 backdrop-blur-sm h-full" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', border: '1px solid rgba(225, 176, 81, 0.2)' }}>
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))' }}>
                  <Globe className="w-8 h-8" style={{ color: 'rgba(0, 0, 0, 1)' }} />
                </div>
                <h3 className="text-2xl mb-4">Comment ça marche ?</h3>
                <p className="text-gray-400 leading-relaxed">
                  Imaginez un énorme carnet partagé par tout le monde dans le monde. Chaque fois que quelqu'un 
                  envoie de la crypto, c'est noté dans ce carnet. Impossible de tricher car tout le monde vérifie !
                </p>
              </div>
            </motion.div>

            {/* Wallet explanation */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="relative rounded-2xl p-8 backdrop-blur-sm h-full" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', border: '1px solid rgba(138, 28, 38, 0.3)' }}>
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 1), rgba(138, 28, 38, 1))' }}>
                  <Wallet className="w-8 h-8" style={{ color: 'rgba(255, 255, 255, 1)' }} />
                </div>
                <h3 className="text-2xl mb-4">C'est quoi un wallet ?</h3>
                <p className="text-gray-400 leading-relaxed">
                  Un wallet (portefeuille), c'est votre coffre-fort personnel pour stocker vos cryptomonnaies. 
                  Comme votre portefeuille physique, mais numérique. Vous seul avez la clé !
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* How to Create Wallet Section */}
        <motion.div 
          className="mb-20 pt-[40px] pr-[0px] pb-[0px] pl-[0px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <div className="text-center mb-12 mt-16">
            <h2 className="text-4xl mb-4">Créer votre premier wallet</h2>
            <p className="text-gray-400 text-lg">
              On vous recommande MetaMask - c'est simple, gratuit et sécurisé !
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Step 1 */}
            <motion.div 
              className="flex gap-6 items-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(3, 189, 108, 1)', color: 'rgba(0, 0, 0, 1)' }}>
                1
              </div>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Download className="w-5 h-5" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                  <h3 className="text-xl">Téléchargez MetaMask</h3>
                </div>
                <p className="text-gray-400">
                  Allez sur <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'rgba(3, 189, 108, 1)' }}>metamask.io</a> et 
                  téléchargez l'extension pour votre navigateur (Chrome, Firefox, Brave...). C'est 100% gratuit !
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="flex gap-6 items-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(3, 189, 108, 1)', color: 'rgba(0, 0, 0, 1)' }}>
                2
              </div>
              <div className="flex-1 rounded-xl p-6 backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <Wallet className="w-5 h-5" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                  <h3 className="text-xl">Créez votre wallet</h3>
                </div>
                <p className="text-gray-400">
                  Suivez les instructions à l'écran. MetaMask va créer votre wallet en quelques clics. 
                  Choisissez un mot de passe fort - c'est important !
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="flex gap-6 items-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(3, 189, 108, 1)', color: 'rgba(0, 0, 0, 1)' }}>
                3
              </div>
              <div className="flex-1 rounded-xl p-6 backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <Key className="w-5 h-5" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                  <h3 className="text-xl">Sauvegardez votre phrase secrète</h3>
                </div>
                <p className="text-gray-400 mb-3">
                  MetaMask va vous donner 12 mots à noter. C'est votre clé de secours ! 
                  <span className="text-red-400"> TRÈS IMPORTANT</span> : notez-les sur papier et gardez-les en sécurité. 
                  Ne les partagez JAMAIS avec personne !
                </p>
                <div className="rounded-lg p-4" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <p className="text-sm" style={{ color: 'rgba(252, 165, 165, 1)' }}>
                    ⚠️ Si vous perdez ces mots, vous perdez l'accès à votre wallet pour toujours. 
                    Si quelqu'un les obtient, il peut voler tout votre argent !
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              className="flex gap-6 items-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(3, 189, 108, 1)', color: 'rgba(0, 0, 0, 1)' }}>
                4
              </div>
              <div className="flex-1 rounded-xl p-6 backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                  <h3 className="text-xl">C'est prêt !</h3>
                </div>
                <p className="text-gray-400">
                  Félicitations ! Votre wallet est créé. Vous pouvez maintenant recevoir et envoyer de l'ETH. 
                  Pour participer à notre loterie, il vous suffit de connecter votre wallet à notre site.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="rounded-2xl p-8 backdrop-blur-sm mt-16 mb-16"
          style={{ background: 'linear-gradient(to bottom right, rgba(3, 189, 108, 0.1), rgba(110, 14, 26, 0.1))', border: '1px solid rgba(3, 189, 108, 0.2)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
        >
          <h3 className="text-2xl mb-4">Besoin d'aide ?</h3>
          <p className="text-gray-400 mb-6">
            Pas de stress ! Notre équipe sera présente lors de l'événement les 28, 29 et 30 novembre pour vous aider 
            à créer votre wallet et faire votre première donation. On est là pour vous accompagner !
          </p>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-2" style={{ color: 'rgba(3, 189, 108, 1)' }}>
              <CheckCircle className="w-5 h-5" />
              <span>Assistance en direct</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'rgba(3, 189, 108, 1)' }}>
              <CheckCircle className="w-5 h-5" />
              <span>Tutoriels vidéo</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'rgba(3, 189, 108, 1)' }}>
              <CheckCircle className="w-5 h-5" />
              <span>Guide pas à pas</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Footer 
        onHowItWorksClick={() => {}}
        onAboutClick={onAboutClick}
      />
    </div>
  );
}