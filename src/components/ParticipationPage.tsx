import { ArrowLeft, Sparkles, Heart, Gift } from "lucide-react";

interface ParticipationPageProps {
  onBack: () => void;
  onDonationClick?: () => void;
}

export function ParticipationPage({ onBack, onDonationClick }: ParticipationPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-32">
        {/* Title Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-[#E1B051] via-[#C18F28] to-[#E1B051] bg-clip-text text-transparent">
            Comment ça marche ?
          </h1>
          <p className="text-base text-white max-w-3xl mx-auto">
            Participez à notre loterie éthique et transparente. Chaque participation contribue à soutenir des causes caritatives tout en vous donnant une chance de gagner des prix incroyables.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E1B051]/20 to-[#C18F28]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-[#E1B051]/10 to-[#C18F28]/10 border border-[#E1B051]/20 rounded-2xl p-8 backdrop-blur-sm hover:border-[#E1B051]/40 transition-all duration-300">
              <div className="w-13 h-13 bg-gradient-to-br from-[#E1B051] to-[#C18F28] rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <div className="text-6xl text-[#E1B051]/20 mb-2">01</div>
              <h3 className="text-2xl mb-4">Connectez votre wallet</h3>
              <p className="text-gray-400">
                Utilisez votre wallet Ethereum pour vous connecter en toute sécurité. Si vous n'en avez pas, nous vous guidons dans la création.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6E0E1A]/20 to-[#8A1C26]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-[#6E0E1A]/10 to-[#8A1C26]/10 border border-[#8A1C26]/30 rounded-2xl p-8 backdrop-blur-sm hover:border-[#8A1C26]/40 transition-all duration-300">
              <div className="w-13 h-13 bg-gradient-to-br from-[#6E0E1A] to-[#8A1C26] rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-6xl text-[#8A1C26]/30 mb-2">02</div>
              <h3 className="text-2xl mb-4">Faites un don</h3>
              <p className="text-gray-400">
                Choisissez le montant de votre participation. 100% des fonds collectés sont reversés à des associations caritatives.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E1B051]/20 to-[#6E0E1A]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-[#E1B051]/10 to-[#6E0E1A]/10 border border-[#E1B051]/20 rounded-2xl p-8 backdrop-blur-sm hover:border-[#E1B051]/40 transition-all duration-300">
              <div className="w-13 h-13 bg-gradient-to-br from-[#E1B051] to-[#C18F28] rounded-xl flex items-center justify-center mb-6">
                <Gift className="w-6 h-6 text-black" />
              </div>
              <div className="text-6xl text-[#E1B051]/20 mb-2">03</div>
              <h3 className="text-2xl mb-4">Tentez votre chance</h3>
              <p className="text-gray-400">
                Recevez automatiquement votre ticket de loterie. Le tirage au sort aura lieu le 30 novembre et les gagnants seront annoncés en direct.
              </p>
            </div>
          </div>
        </div>

        {/* Donate Button */}
        <div className="text-center">
          <button
            onClick={onDonationClick}
            className="inline-flex items-center gap-3 px-8 py-5 border border-[#B3841B] bg-gradient-to-r from-[#C18F28] via-[#E1B051] to-[#C18F28] backdrop-blur-sm shadow-[0_6px_25px_rgba(179,132,27,0.45)] brightness-110 text-black rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 group text-lg"
          >
            <span>Faire un don maintenant</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Transactions sécurisées via la blockchain Ethereum
          </p>
        </div>
      </div>
    </div>
  );
}