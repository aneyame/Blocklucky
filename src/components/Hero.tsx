import image_fd9d89968419087df6bd0a5e4e9192dfc76af17d from '../assets/fd9d89968419087df6bd0a5e4e9192dfc76af17d.png';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-visible">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E1B051]/5 via-transparent to-black pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center pt-10 space-y-8 mx-[101px] my-[40px]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B3841B] bg-gradient-to-r from-[#C18F28] via-[#E1B051] to-[#C18F28] backdrop-blur-sm shadow-[0_6px_25px_rgba(179,132,27,0.45)] brightness-110">          
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

        CTA Button
//         <Link 
          to="/participate"
          className="inline-flex items-center gap-2 px-8 py-4 bg-lime-400 text-black rounded-full transition-all ease-in-out hover:shadow-xl hover:shadow-lime-400/20 group"
        >
          <span>Participer</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-600 ease-in-out" />
        </Link>

        {/* Hero Image */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-[#E1B051]/20 to-transparent blur-3xl" />
          <div className="relative rounded-2xl overflow-hidden border border-[#E1B051]/20 bg-black/20 backdrop-blur-sm p-4 md:p-4 shadow-2xl shadow-[#E1B051]/10">
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