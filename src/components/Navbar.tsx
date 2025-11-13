import { Ticket } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">      
      <div className="max-w-7xl mx-auto flex items-center justify-between mt-[0px] mr-[0px] mb-[5px] ml-[0px] py-[0px] py-[13px] px-[24px]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-lime-400/20 to-purple-400/20 flex items-center justify-center">
            <Ticket className="w-5 h-5 text-lime-400" />
          </div>
          <span className="text-white text-xl">Etherbay Lottery</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-gray-400 hover:text-lime-400 transition-colors">
            Accueil
          </a>
          <a href="#how-it-works" className="text-gray-400 hover:text-lime-400 transition-colors">
            Comment ça marche
          </a>
          <a href="#about" className="text-gray-400 hover:text-lime-400 transition-colors">
            À propos
          </a>
        </div>

        {/* CTA Button */}
        <button className="px-6 py-2 bg-lime-400 hover:bg-lime-300 text-black rounded-full transition-all hover:shadow-lg hover:shadow-lime-400/50">
          Connecter mon wallet
        </button>
        <button className="px-6 py-2 bg-lime-400 hover:bg-lime-300 text-black rounded-full transition-all hover:shadow-lg hover:shadow-lime-400/50">
          Participer
        </button>
      </div>
    </nav>
  );
}