import image_9f76aed85e1c9a99b6c8879283140c04f8b1f1d7 from 'figma:asset/9f76aed85e1c9a99b6c8879283140c04f8b1f1d7.png';
import { ArrowRight } from "lucide-react";
import heroImage from "figma:asset/c871b0fdc3cd1f539efdaac6281a3a607b8de5cf.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 mx-[101px] my-[40px]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lime-400/30 bg-lime-400/10 backdrop-blur-sm shadow-md shadow-lime-400/20">
          <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-lime-400 text-sm">La loterie ETH d'etherbay</span>
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

        {/* CTA Button */}
        <button className="inline-flex items-center gap-2 px-8 py-4 bg-lime-400 hover:bg-lime-300 text-black rounded-full transition-all hover:shadow-lg hover:shadow-lime-400/50 group">
          <span>Participer</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Hero Image */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-lime-400/20 to-transparent blur-3xl" />
          <div className="relative rounded-2xl overflow-hidden border border-lime-500/20 bg-gradient-to-br from-purple-900/10 to-lime-900/10 backdrop-blur-sm p-4 md:p-8 shadow-2xl shadow-lime-400/10">
            <img 
              src={image_9f76aed85e1c9a99b6c8879283140c04f8b1f1d7} 
              alt="Lottery Ticket" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}