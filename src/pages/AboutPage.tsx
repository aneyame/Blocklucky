import { Users, MapPin, Calendar, Sparkles, Heart, Gift, Trophy, Music, Utensils } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "../components/Footer";

interface AboutPageProps {
  onHowItWorksClick: () => void;
  onHomeClick: () => void;
  onDonationClick?: () => void;
}

export function AboutPage({ onHowItWorksClick, onHomeClick, onDonationClick }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div style={{height : '140px'}}>

      </div>

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
            className="rounded-2xl p-6 backdrop-blur-sm text-center" style={{ background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 0.1), rgba(138, 28, 38, 0.1))', border: '1px solid rgba(138, 28, 38, 0.3)' }}
          >
            <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgba(138, 28, 38, 1)' }} />
            <h3 className="text-xl mb-2">Dates</h3>
            <p className="text-gray-400">28, 29 & 30 Novembre 2025</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 1 * 0.1 }}
            className="rounded-2xl p-6 backdrop-blur-sm text-center" style={{ background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 0.1), rgba(138, 28, 38, 0.1))', border: '1px solid rgba(138, 28, 38, 0.3)' }}
          >
            <MapPin className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgba(138, 28, 38, 1)' }} />
            <h3 className="text-xl mb-2">Lieu</h3>
            <p className="text-gray-400">Campus Universitaire<br />Hall Principal</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 2 * 0.1 }}
            className="rounded-2xl p-6 backdrop-blur-sm text-center" style={{ background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 0.1), rgba(138, 28, 38, 0.1))', border: '1px solid rgba(138, 28, 38, 0.3)' }}
          >
            <Users className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgba(138, 28, 38, 1)' }} />
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
          <div className="rounded-2xl p-8 backdrop-blur-sm" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', border: '1px solid rgba(225, 176, 81, 0.2)' }}>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              La ville d'<span style={{ color: 'rgba(225, 176, 81, 1)' }}>Etherbay</span> organise une grande loterie. Le but ? Démocratiser l'accès à la cryptomonnaie en organisant un événement éducatif, ludique mais surtout caritatif.
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
                className="flex items-center gap-3 rounded-lg p-4" style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              >
                <Heart className="w-6 h-6" style={{ color: 'rgba(225, 176, 81, 1)' }} />
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
                className="flex items-center gap-3 rounded-lg p-4" style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              >
                <Trophy className="w-6 h-6" style={{ color: 'rgba(138, 28, 38, 1)' }} />
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
                className="flex items-center gap-3 rounded-lg p-4" style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              >
                <Sparkles className="w-6 h-6" style={{ color: 'rgba(225, 176, 81, 1)' }} />
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
            <h2 className="text-4xl mb-8 p-[0px] text-center" >Les stands présents</h2>
            <p className="text-center text-gray-400max-w-2xl mx-auto" >
              Venez découvrir nos stands partenaires et profitez d'une expérience complète lors de l'événement !
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6" style={{marginTop : '40px'}}>
            {/* Crypto Education Stand */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0 * 0.1 }}
              className="relative"
            >
              <div className="relative rounded-2xl p-6 backdrop-blur-sm h-full" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', border: '1px solid rgba(225, 176, 81, 0.3)' }}>
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))' }}>
                  <Sparkles className="w-7 h-7" style={{ color: 'rgba(0, 0, 0, 1)' }} />
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
              <div className="relative rounded-2xl p-6 backdrop-blur-sm h-full" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', border: '1px solid rgba(110, 14, 26, 0.5)' }}>
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 1), rgba(138, 28, 38, 1))' }}>
                  <Gift className="w-7 h-7" style={{ color: 'rgba(255, 255, 255, 1)' }} />
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
              <div className="relative rounded-2xl p-6 backdrop-blur-sm h-full" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', border: '1px solid rgba(225, 176, 81, 0.3)' }}>
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))' }}>
                  <Trophy className="w-7 h-7" style={{ color: 'rgba(0, 0, 0, 1)' }} />
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
              <div className="relative rounded-2xl p-6 backdrop-blur-sm h-full" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', border: '1px solid rgba(110, 14, 26, 0.5)' }}>
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 1), rgba(138, 28, 38, 1))' }}>
                  <Music className="w-7 h-7" style={{ color: 'rgba(255, 255, 255, 1)' }} />
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
              <div className="relative rounded-2xl p-6 backdrop-blur-sm h-full" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', border: '1px solid rgba(225, 176, 81, 0.3)' }}>
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))' }}>
                  <Utensils className="w-7 h-7" style={{ color: 'rgba(0, 0, 0, 1)' }} />
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
              <div className="relative rounded-2xl p-6 backdrop-blur-sm h-full" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', border: '1px solid rgba(110, 14, 26, 0.5)' }}>
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 1), rgba(138, 28, 38, 1))' }}>
                  <Heart className="w-7 h-7" style={{ color: 'rgba(255, 255, 255, 1)' }} />
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
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{ fontSize: '2.25rem', lineHeight: '2.5rem', color: 'rgba(255, 255, 255, 1)', marginBottom: '1rem' }}>
              Programme de l'événement
            </h2>
            <p style={{ color: 'rgba(156, 163, 175, 1)', maxWidth: '42rem', margin: '0 auto' }}>
              Trois jours de festivités, concerts, conférences et tirages au sort.<br />
              Ne manquez pas les annonces des gagnants !
            </p>
          </motion.div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {/* Day 1 - Jeudi 28 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0 * 0.2, ease: "easeOut" }}
              style={{ borderRadius: '1rem', padding: '1.5rem', background: 'linear-gradient(to bottom right, rgba(193, 143, 40, 0.05), rgba(225, 176, 81, 0.05))', border: '1px solid rgba(225, 176, 81, 0.2)' }}
            >
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(31, 41, 55, 1)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{ fontSize: '3rem', lineHeight: '1', color: 'rgba(225, 176, 81, 1)' }}>28</span>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 1)' }}>Novembre</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)' }}>Jeudi</div>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(75, 85, 99, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>14:00</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Ouverture de l'événement</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Début des festivités avec animations et stands</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(75, 85, 99, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>15:30</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Conférence Crypto pour débutants</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Introduction à la blockchain et aux cryptomonnaies</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(193, 143, 40, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(193, 143, 40, 1)' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(0, 0, 0, 1)' }} />
                    </div>
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(225, 176, 81, 1)' }}>17:00</span>
                      <Trophy style={{ width: '16px', height: '16px', color: 'rgba(225, 176, 81, 1)' }} />
                    </div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 1)', marginBottom: '4px' }}>Tirage au sort #1</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Annonce des premiers gagnants de la loterie</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(75, 85, 99, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>18:00</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Concert Live - DJ Set</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Électro par DJ Neon Wave</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(193, 143, 40, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(193, 143, 40, 1)' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(0, 0, 0, 1)' }} />
                    </div>
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(225, 176, 81, 1)' }}>20:00</span>
                      <Trophy style={{ width: '16px', height: '16px', color: 'rgba(225, 176, 81, 1)' }} />
                    </div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 1)', marginBottom: '4px' }}>Tirage au sort #2</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Deuxième série de gagnants révélée</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>21:00</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Afterparty</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Soirée festive avec musique et animations</p>
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
              style={{ borderRadius: '1rem', padding: '1.5rem', background: 'linear-gradient(to bottom right, rgba(193, 143, 40, 0.05), rgba(225, 176, 81, 0.05))', border: '1px solid rgba(225, 176, 81, 0.2)' }}
            >
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(31, 41, 55, 1)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{ fontSize: '3rem', lineHeight: '1', color: 'rgba(225, 176, 81, 1)' }}>29</span>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 1)' }}>Novembre</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)' }}>Vendredi</div>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(75, 85, 99, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>10:00</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Ouverture jour 2</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Reprise des activités et animations</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(75, 85, 99, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>11:00</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Atelier: Créer son wallet</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Session pratique pour démarrer avec la crypto</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(193, 143, 40, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(193, 143, 40, 1)' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(0, 0, 0, 1)' }} />
                    </div>
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(225, 176, 81, 1)' }}>12:00</span>
                      <Trophy style={{ width: '16px', height: '16px', color: 'rgba(225, 176, 81, 1)' }} />
                    </div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 1)', marginBottom: '4px' }}>Tirage au sort #3</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Nouveaux gagnants annoncés en direct</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(75, 85, 99, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>14:30</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Table ronde: L'avenir du Web3</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Discussions avec des experts de la blockchain</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(75, 85, 99, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>16:00</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Concert - Groupe local</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Performance live d'un groupe d'Etherbay</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(193, 143, 40, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(193, 143, 40, 1)' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(0, 0, 0, 1)' }} />
                    </div>
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(225, 176, 81, 1)' }}>19:00</span>
                      <Trophy style={{ width: '16px', height: '16px', color: 'rgba(225, 176, 81, 1)' }} />
                    </div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 1)', marginBottom: '4px' }}>Tirage au sort #4</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Quatrième vague de gagnants</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>20:30</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Soirée Neon Party</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Ambiance futuriste et DJ sets</p>
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
              style={{ borderRadius: '1rem', padding: '1.5rem', background: 'linear-gradient(to bottom right, rgba(193, 143, 40, 0.05), rgba(225, 176, 81, 0.05))', border: '1px solid rgba(225, 176, 81, 0.2)' }}
            >
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(31, 41, 55, 1)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{ fontSize: '3rem', lineHeight: '1', color: 'rgba(225, 176, 81, 1)' }}>30</span>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 1)' }}>Novembre</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)' }}>Samedi</div>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(75, 85, 99, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>10:00</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Dernier jour - Ouverture</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Dernière journée de festivités</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(75, 85, 99, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>11:00</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Smart Contracts expliqués</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Comprendre la technologie derrière la loterie</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(193, 143, 40, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(193, 143, 40, 1)' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(0, 0, 0, 1)' }} />
                    </div>
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(225, 176, 81, 1)' }}>12:00</span>
                      <Trophy style={{ width: '16px', height: '16px', color: 'rgba(225, 176, 81, 1)' }} />
                    </div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 1)', marginBottom: '4px' }}>Tirage au sort #5</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Avant-dernière série de gagnants</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(75, 85, 99, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>14:00</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Concert Final - Artiste principal</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Performance de clôture avec artiste invité</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(75, 85, 99, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>16:00</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Distribution des cadeaux</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Remise des lots aux gagnants présents</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px', paddingBottom: '16px', borderLeft: '2px solid rgba(193, 143, 40, 1)' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(193, 143, 40, 1)' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(0, 0, 0, 1)' }} />
                    </div>
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(225, 176, 81, 1)' }}>19:00</span>
                      <Trophy style={{ width: '16px', height: '16px', color: 'rgba(225, 176, 81, 1)' }} />
                    </div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 1)', marginBottom: '4px' }}>Grand Tirage Final</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Derniers gagnants et clôture de la loterie</p>
                  </div>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '16px' }}>
                  <div style={{ position: 'absolute', left: '-12px', top: '0' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(75, 85, 99, 1)' }} />
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', marginBottom: '4px' }}>20:00</div>
                    <h4 style={{ fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '4px' }}>Clôture de l'événement</h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(107, 114, 128, 1)' }}>Remerciements et fin des festivités</p>
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
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <p style={{ color: 'rgba(255, 255, 255, 1)', marginBottom: '1rem', marginTop: '80px' }}>
              Tous les tirages sont diffusés en direct sur place
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '9999px', border: '1px solid rgba(179, 132, 27, 0.4)', background: 'linear-gradient(to right, rgba(193, 143, 40, 0.4), rgba(225, 176, 81, 0.4), rgba(193, 143, 40, 0.4))', marginBottom: '200px', padding: '10px 20px' }}>
              <Trophy style={{ width: '20px', height: '20px', color: 'rgba(179, 132, 27, 1)' }} />
              <span style={{ color: 'rgba(255, 255, 255, 1)', padding: '6px 20px' }}>6 tirages au sort sur 3 jours</span>
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