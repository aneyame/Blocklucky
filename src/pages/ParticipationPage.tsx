import { Sparkles, Heart, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ParticipationPageProps {
  onDonationClick?: () => void;
}

export function ParticipationPage({ onDonationClick }: ParticipationPageProps) {
  const navigate = useNavigate();

  const handleDonationClick = () => {
    if (onDonationClick) {
      onDonationClick();
    } else {
      navigate('/participate');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-20">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Title Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 
            className="text-4xl md:text-5xl bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(to right, rgba(225, 176, 81, 1), rgba(193, 143, 40, 1), rgba(225, 176, 81, 1))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
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
            <div 
              className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 0.2), rgba(193, 143, 40, 0.2))' }}
            />
            <div 
              className="relative rounded-2xl p-8 backdrop-blur-sm transition-all duration-300"
              style={{ 
                background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 0.1), rgba(193, 143, 40, 0.1))',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(225, 176, 81, 0.2)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.2)'}
            >
              <div 
                className="rounded-xl inline-flex items-center justify-center mb-6"
                style={{ 
                  background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))',
                  width: '3.25rem',
                  height: '3.25rem'
                }}
              >
                <Sparkles className="w-10 h-10 text-black" />
              </div>
              <div className="mb-2" style={{ fontSize: '3.75rem', lineHeight: 1, color: 'rgba(225, 176, 81, 0.2)', marginBottom: '0.5rem' }}>01</div>
              <h3 className="text-2xl mb-4">Connectez votre wallet</h3>
              <p className="text-gray-400">
                Utilisez votre wallet Ethereum pour vous connecter en toute sécurité. Si vous n'en avez pas, nous vous guidons dans la création.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group">
            <div 
              className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 0.2), rgba(138, 28, 38, 0.2))' }}
            />
            <div 
              className="relative rounded-2xl p-8 backdrop-blur-sm transition-all duration-300"
              style={{ 
                background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 0.1), rgba(138, 28, 38, 0.1))',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(138, 28, 38, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(138, 28, 38, 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(138, 28, 38, 0.3)'}
            >
              <div 
                className="rounded-xl inline-flex items-center justify-center mb-6"
                style={{ 
                  background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 1), rgba(138, 28, 38, 1))',
                  width: '3.25rem',
                  height: '3.25rem'
                }}
              >
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="mb-2" style={{ fontSize: '3.75rem', lineHeight: 1, color: 'rgba(138, 28, 38, 0.3)', marginBottom: '0.5rem' }}>02</div>
              <h3 className="text-2xl mb-4">Faites un don</h3>
              <p className="text-gray-400">
                Choisissez le montant de votre participation. 100% des fonds collectés sont reversés à des associations caritatives.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group">
            <div 
              className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 0.2), rgba(110, 14, 26, 0.2))' }}
            />
            <div 
              className="relative rounded-2xl p-8 backdrop-blur-sm transition-all duration-300"
              style={{ 
                background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 0.1), rgba(110, 14, 26, 0.1))',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(225, 176, 81, 0.2)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.2)'}
            >
              <div 
                className="rounded-xl inline-flex items-center justify-center mb-6"
                style={{ 
                  background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))',
                  width: '3.25rem',
                  height: '3.25rem'
                }}
              >
                <Gift className="w-6 h-6 text-black" />
              </div>
              <div className="mb-2" style={{ fontSize: '3.75rem', lineHeight: 1, color: 'rgba(225, 176, 81, 0.2)', marginBottom: '0.5rem' }}>03</div>
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
            onClick={handleDonationClick}
            className="inline-flex items-center gap-3 px-8 py-5 backdrop-blur-sm brightness-110 text-black rounded-full transition-all duration-300 group text-lg mb-6"
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(179, 132, 27, 1)',
              background: 'linear-gradient(to right, rgba(193, 143, 40, 1), rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))',
              boxShadow: '0 6px 25px rgba(179, 132, 27, 0.45)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(179, 132, 27, 0.45)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span >Faire un don maintenant</span>
            <Sparkles className="w-5 h-14 group-hover:rotate-12 transition-transform duration-300 " />
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Transactions sécurisées via la blockchain Ethereum
          </p>
        </div>
      </div>
    </div>
  );
}