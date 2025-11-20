import image_fd9d89968419087df6bd0a5e4e9192dfc76af17d from '../assets/fd9d89968419087df6bd0a5e4e9192dfc76af17d.png';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-visible">
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(225, 176, 81, 0.05), transparent, rgba(0, 0, 0, 1))'
      }} />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center pt-10 space-y-8 mx-[101px] my-[40px]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm brightness-110" style={{
          border: '1px solid rgba(179, 132, 27, 1)',
          background: 'linear-gradient(to right, rgba(193, 143, 40, 1), rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))',
          boxShadow: '0 6px 25px rgba(179, 132, 27, 0.45)'
        }}>          
          <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="text-black text-sm">La loterie ETH d'etherbay</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl text-white max-w-4xl mx-auto">
          Tente ta chance, et gagne des cadeaux !
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Simple, sécurisé, transparent.<br />
          Une loterie pensée pour vous introduire à la cryptomonnaie.
        </p>

        <Link 
          to="/how-it-works"
          className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-full transition-all ease-in-out group"
          style={{
            backgroundColor: 'rgba(110, 14, 26, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(138, 28, 38, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span>Participer</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-600 ease-in-out" />
        </Link>

        {/* Hero Image */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          <div className="absolute inset-0 blur-3xl" style={{
            background: 'linear-gradient(to top, rgba(225, 176, 81, 0.2), transparent)'
          }} />
          <div className="relative rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm p-4 md:p-4" style={{
            border: '1px solid rgba(225, 176, 81, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(225, 176, 81, 0.1)'
          }}>
            <img 
              src={image_fd9d89968419087df6bd0a5e4e9192dfc76af17d} 
              alt="Lottery Ticket" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}