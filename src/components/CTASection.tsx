interface CTASectionProps {
  onDonationClick?: () => void;
}

export function CTASection({ onDonationClick }: CTASectionProps) {
  return (
    <section className="relative pt-1 py-16 px-6 bg-black mb-16">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl" style={{
        backgroundColor: 'rgba(225, 176, 81, 0.05)'
      }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="rounded-2xl p-12 text-center backdrop-blur-sm">
          <h2 className="text-white text-5xl md:text-4xl mb-4">Faite un don aujourd'hui</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Participez à la loterie solidaire et soutenez des causes caritatives tout en ayant la chance de gagner des prix exceptionnels.
          </p>
          <button 
            onClick={onDonationClick}
            className="inline-flex items-center gap-2 px-8 py-4 brightness-110 text-black rounded-full transition-all duration-300"
            style={{
              background: 'linear-gradient(to right, rgba(193, 143, 40, 1), rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))',
              boxShadow: '0 10px 15px -3px rgba(225, 176, 81, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(225, 176, 81, 0.2)';
            }}
          >
            Découvrir comment participer
          </button>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{
            backgroundColor: 'rgba(126, 37, 32, 0.2)'
          }} />
        </div>
      </div>
    </section>
  );
}