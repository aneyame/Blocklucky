import { Users, MapPin, Calendar, Sparkles, Heart, Gift, Trophy, Music, Utensils } from "lucide-react";
import { motion } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface AboutPageProps {
  onHowItWorksClick: () => void;
  onHomeClick: () => void;
  onDonationClick?: () => void;
}

export function AboutPage({ onHowItWorksClick, onHomeClick, onDonationClick }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-32">
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-6"
        >
          <h1 className="text-4xl md:text-5xl text-white drop-shadow-[0_0_30px_rgba(225,176,81,0.5)] font-medium pt-[52px] pr-[0px] pb-[0px] pl-[0px]">
            À propos de l'événement
          </h1>
          <p className="text-base text-white max-w-3xl mx-auto">
            Découvrez qui nous sommes et ce qui vous attend lors de cet événement unique !
          </p>
        </motion.div>

        {/* Event Info */}
        <div className="mb-16 grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0 * 0.1 }}
            className="bg-gradient-to-br from-[#6E0E1A]/10 to-[#8A1C26]/10 border border-[#8A1C26]/30 rounded-2xl p-6 backdrop-blur-sm text-center"
          >
            <Calendar className="w-12 h-12 text-[#8A1C26] mx-auto mb-4" />
            <h3 className="text-xl mb-2">Dates</h3>
            <p className="text-gray-400">28, 29 & 30 Novembre 2025</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 1 * 0.1 }}
            className="bg-gradient-to-br from-[#6E0E1A]/10 to-[#8A1C26]/10 border border-[#8A1C26]/30 rounded-2xl p-6 backdrop-blur-sm text-center"
          >
            <MapPin className="w-12 h-12 text-[#8A1C26] mx-auto mb-4" />
            <h3 className="text-xl mb-2">Lieu</h3>
            <p className="text-gray-400">Campus Universitaire<br />Hall Principal</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 2 * 0.1 }}
            className="bg-gradient-to-br from-[#6E0E1A]/10 to-[#8A1C26]/10 border border-[#8A1C26]/30 rounded-2xl p-6 backdrop-blur-sm text-center"
          >
            <Users className="w-12 h-12 text-[#8A1C26] mx-auto mb-4" />
            <h3 className="text-xl mb-2">Organisateurs</h3>
            <p className="text-gray-400">Etherbay Team<br />& Partenaires</p>
          </motion.div>
        </div>

        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 pb-30"
        >
          <h2 className="text-4xl mb-8 pt-10 text-center">Qui sommes-nous ?</h2>
          <div className="bg-gradient-to-br from-gray-900/80 to-black border border-[#E1B051]/20 rounded-2xl p-8 backdrop-blur-sm">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              La ville d'<span className="text-[#E1B051]">Etherbay</span> organise une grande loterie. Le but ? Démocratiser l'accès à la cryptomonnaie en organisant un événement éducatif, ludique mais surtout caritatif.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Cette loterie caritative est notre projet phare pour initier les étudiants et le grand public à l'univers de la crypto 
              de manière simple, transparente et amusante, tout en soutenant des causes qui nous tiennent à cœur.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-3 bg-white/5 rounded-lg p-4"
              >
                <Heart className="w-6 h-6 text-[#E1B051]" />
                <div>
                  <div className="text-2xl">100%</div>
                  <div className="text-sm text-gray-400">Pour la charité</div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-center gap-3 bg-white/5 rounded-lg p-4"
              >
                <Trophy className="w-6 h-6 text-[#8A1C26]" />
                <div>
                  <div className="text-2xl">3 400</div>
                  <div className="text-sm text-gray-400">Prix à gagner</div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center gap-3 bg-white/5 rounded-lg p-4"
              >
                <Sparkles className="w-6 h-6 text-[#E1B051]" />
                <div>
                  <div className="text-2xl">100%</div>
                  <div className="text-sm text-gray-400">Transparent</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stands Section */}
        <div className="mb-16 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl mb-8 p-[0px] text-center">Les stands présents</h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
              Venez découvrir nos stands partenaires et profitez d'une expérience complète lors de l'événement !
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Crypto Education Stand */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0 * 0.1 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black border-[#E1B051]/30 border rounded-2xl p-6 backdrop-blur-sm h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-[#E1B051] to-[#C18F28] rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-xl mb-3">Initiation Crypto</h3>
                <p className="text-gray-400 text-sm">
                  Apprenez les bases de la blockchain et de la crypto avec nos experts. Créez votre premier wallet sur place !
                </p>
              </div>
            </motion.div>

            {/* NFT Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 1 * 0.1 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black border border-[#6E0E1A]/50 rounded-2xl p-6 backdrop-blur-sm h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-[#6E0E1A] to-[#8A1C26] rounded-lg flex items-center justify-center mb-4">
                  <Gift className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-3">Galerie NFT</h3>
                <p className="text-gray-400 text-sm">
                  Découvrez l'univers des NFTs avec une exposition d'œuvres numériques créées par des artistes locaux.
                </p>
              </div>
            </motion.div>

            {/* Gaming Zone */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 2 * 0.1 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black border border-[#E1B051]/30 rounded-2xl p-6 backdrop-blur-sm h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-[#E1B051] to-[#C18F28] rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-xl mb-3">Zone Gaming</h3>
                <p className="text-gray-400 text-sm">
                  Testez les derniers jeux Web3 et découvrez le play-to-earn. Participez à des tournois avec des prix à gagner !
                </p>
              </div>
            </motion.div>

            {/* Music & Entertainment */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 3 * 0.1 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black border border-[#6E0E1A]/50 rounded-2xl p-6 backdrop-blur-sm h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-[#6E0E1A] to-[#8A1C26] rounded-lg flex items-center justify-center mb-4">
                  <Music className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-3">Musique Live</h3>
                <p className="text-gray-400 text-sm">
                  Découvrez l'univers des NFTs avec une exposition d'œuvres numériques créées par des artistes locaux.
                </p>
              </div>
            </motion.div>

            {/* Food & Drinks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 4 * 0.1 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black border border-[#E1B051]/30 rounded-2xl p-6 backdrop-blur-sm h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-[#E1B051] to-[#C18F28] rounded-lg flex items-center justify-center mb-4">
                  <Utensils className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-xl mb-3">Food & Boissons</h3>
                <p className="text-gray-400 text-sm">
                  Bar et food trucks sur place. Restauration variée pour tous les goûts. Certains acceptent les paiements crypto !
                </p>
              </div>
            </motion.div>

            {/* Charity Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 5 * 0.1 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black border border-[#6E0E1A]/50 rounded-2xl p-6 backdrop-blur-sm h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-[#6E0E1A] to-[#8A1C26] rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-3">Stand Associations</h3>
                <p className="text-gray-400 text-sm">
                  Rencontrez les associations caritatives que nous soutenons. Découvrez leurs actions et leur impact.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Program Highlight */}
        <div className="pt-[20px] pr-[0px] pb-[0px] pl-[0px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4">
              Programme de l'événement
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Trois jours de festivités, concerts, conférences et tirages au sort.<br />
              Ne manquez pas les annonces des gagnants !
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Day 1 - Jeudi 28 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0 * 0.2, ease: "easeOut" }}
              className="bg-gradient-to-br from-[#C18F28]/5 to-[#E1B051]/5 border border-[#E1B051]/20 rounded-2xl p-6"
            >
              <div className="mb-6 pb-6 border-b border-gray-800">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl text-[#E1B051]">28</span>
                  <div>
                    <div className="text-white">Novembre</div>
                    <div className="text-sm text-gray-400">Jeudi</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="relative pl-4 border-l-2 border-gray-800 pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">14:00</div>
                    <h4 className="text-sm text-gray-300 mb-1">Ouverture de l'événement</h4>
                    <p className="text-xs text-gray-500">Début des festivités avec animations et stands</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-gray-800 pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">15:30</div>
                    <h4 className="text-sm text-gray-300 mb-1">Conférence Crypto pour débutants</h4>
                    <p className="text-xs text-gray-500">Introduction à la blockchain et aux cryptomonnaies</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-[#C18F28] pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-[#C18F28] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-black" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-[#E1B051]">17:00</span>
                      <Trophy className="w-4 h-4 text-[#E1B051]" />
                    </div>
                    <h4 className="text-sm text-white mb-1">Tirage au sort #1</h4>
                    <p className="text-xs text-gray-500">Annonce des premiers gagnants de la loterie</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-gray-800 pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">18:00</div>
                    <h4 className="text-sm text-gray-300 mb-1">Concert Live - DJ Set</h4>
                    <p className="text-xs text-gray-500">Performance électro par DJ Neon Wave</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-[#C18F28] pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-[#C18F28] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-black" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-[#E1B051]">20:00</span>
                      <Trophy className="w-4 h-4 text-[#E1B051]" />
                    </div>
                    <h4 className="text-sm text-white mb-1">Tirage au sort #2</h4>
                    <p className="text-xs text-gray-500">Deuxième série de gagnants révélée</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-gray-800">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">21:00</div>
                    <h4 className="text-sm text-gray-300 mb-1">Afterparty</h4>
                    <p className="text-xs text-gray-500">Soirée festive avec musique et animations</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Day 2 - Vendredi 29 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 1 * 0.2, ease: "easeOut" }}
              className="bg-gradient-to-br from-[#C18F28]/5 to-[#E1B051]/5 border border-[#E1B051]/20 rounded-2xl p-6"
            >
              <div className="mb-6 pb-6 border-b border-gray-800">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl text-[#E1B051]">29</span>
                  <div>
                    <div className="text-white">Novembre</div>
                    <div className="text-sm text-gray-400">Vendredi</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="relative pl-4 border-l-2 border-gray-800 pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">10:00</div>
                    <h4 className="text-sm text-gray-300 mb-1">Ouverture jour 2</h4>
                    <p className="text-xs text-gray-500">Reprise des activités et animations</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-gray-800 pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">11:00</div>
                    <h4 className="text-sm text-gray-300 mb-1">Atelier: Créer son wallet</h4>
                    <p className="text-xs text-gray-500">Session pratique pour démarrer avec la crypto</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-[#C18F28] pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-[#C18F28] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-black" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-[#E1B051]">12:00</span>
                      <Trophy className="w-4 h-4 text-[#E1B051]" />
                    </div>
                    <h4 className="text-sm text-white mb-1">Tirage au sort #3</h4>
                    <p className="text-xs text-gray-500">Nouveaux gagnants annoncés en direct</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-gray-800 pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">14:30</div>
                    <h4 className="text-sm text-gray-300 mb-1">Table ronde: L'avenir du Web3</h4>
                    <p className="text-xs text-gray-500">Discussions avec des experts de la blockchain</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-gray-800 pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">16:00</div>
                    <h4 className="text-sm text-gray-300 mb-1">Concert - Groupe local</h4>
                    <p className="text-xs text-gray-500">Performance live d'un groupe d'Etherbay</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-[#C18F28] pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-[#C18F28] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-black" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-[#E1B051]">19:00</span>
                      <Trophy className="w-4 h-4 text-[#E1B051]" />
                    </div>
                    <h4 className="text-sm text-white mb-1">Tirage au sort #4</h4>
                    <p className="text-xs text-gray-500">Quatrième vague de gagnants</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-gray-800">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">20:30</div>
                    <h4 className="text-sm text-gray-300 mb-1">Soirée Neon Party</h4>
                    <p className="text-xs text-gray-500">Ambiance futuriste et DJ sets</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Day 3 - Samedi 30 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 2 * 0.2, ease: "easeOut" }}
              className="bg-gradient-to-br from-[#C18F28]/5 to-[#E1B051]/5 border border-[#E1B051]/20 rounded-2xl p-6"
            >
              <div className="mb-6 pb-6 border-b border-gray-800">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl text-[#E1B051]">30</span>
                  <div>
                    <div className="text-white">Novembre</div>
                    <div className="text-sm text-gray-400">Samedi</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="relative pl-4 border-l-2 border-gray-800 pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">10:00</div>
                    <h4 className="text-sm text-gray-300 mb-1">Dernier jour - Ouverture</h4>
                    <p className="text-xs text-gray-500">Dernière journée de festivités</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-gray-800 pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">11:00</div>
                    <h4 className="text-sm text-gray-300 mb-1">Smart Contracts expliqués</h4>
                    <p className="text-xs text-gray-500">Comprendre la technologie derrière la loterie</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-[#C18F28] pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-[#C18F28] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-black" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-[#E1B051]">12:00</span>
                      <Trophy className="w-4 h-4 text-[#E1B051]" />
                    </div>
                    <h4 className="text-sm text-white mb-1">Tirage au sort #5</h4>
                    <p className="text-xs text-gray-500">Avant-dernière série de gagnants</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-gray-800 pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">14:00</div>
                    <h4 className="text-sm text-gray-300 mb-1">Concert Final - Artiste principal</h4>
                    <p className="text-xs text-gray-500">Performance de clôture avec artiste invité</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-gray-800 pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">16:00</div>
                    <h4 className="text-sm text-gray-300 mb-1">Distribution des cadeaux</h4>
                    <p className="text-xs text-gray-500">Remise des lots aux gagnants présents</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-[#C18F28] pb-4">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-[#C18F28] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-black" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-[#E1B051]">19:00</span>
                      <Trophy className="w-4 h-4 text-[#E1B051]" />
                    </div>
                    <h4 className="text-sm text-white mb-1">Grand Tirage Final</h4>
                    <p className="text-xs text-gray-500">Derniers gagnants et clôture de la loterie</p>
                  </div>
                </div>
                
                <div className="relative pl-4 border-l-2 border-gray-800">
                  <div className="absolute -left-3 top-0">
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm text-gray-400 mb-1">20:00</div>
                    <h4 className="text-sm text-gray-300 mb-1">Clôture de l'événement</h4>
                    <p className="text-xs text-gray-500">Remerciements et fin des festivités</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-white mb-4">
              Tous les tirages sont diffusés en direct sur place
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#B3841B]/40 bg-gradient-to-r from-[#C18F28]/40 via-[#E1B051]/40 to-[#C18F28]/40">
              <Trophy className="w-5 h-5 text-[#B3841B]" />
              <span className="text-white">6 tirages au sort sur 3 jours</span>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer 
        onHowItWorksClick={onHowItWorksClick}
        onAboutClick={() => {}}
        onHomeClick={onHomeClick}
      />
    </div>
  );
}