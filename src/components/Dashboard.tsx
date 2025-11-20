import image_c5ca744fc3a9507fced4f2bf59c4f596da347e94 from '../assets/c5ca744fc3a9507fced4f2bf59c4f596da347e94.png';
import image_a8b37ae233f7de6082e6a5a74d5f6dfa9ade4e60 from '../assets/a8b37ae233f7de6082e6a5a74d5f6dfa9ade4e60.png';
import image_45ca0f5cca8c2e433c227408acd991a25e52f1fe from '../assets/45ca0f5cca8c2e433c227408acd991a25e52f1fe.png';
import image_c91443a2f1e42cd1397e594daaf7f40f3246b356 from '../assets/c91443a2f1e42cd1397e594daaf7f40f3246b356.png';
import image_199002b8d239883b54f1a2604082d866b15dbc74 from '../assets/199002b8d239883b54f1a2604082d866b15dbc74.png';
import image_b77b3dd1c2eb8638468321c22264cb839f11ade4 from '../assets/b77b3dd1c2eb8638468321c22264cb839f11ade4.png';
import image_d33a6b545d4b1dc39db1b6c432a7bc1a2dba6c92 from '../assets/d33a6b545d4b1dc39db1b6c432a7bc1a2dba6c92.png';
import { Card } from "./ui/card";
import { ArrowRight, Coins, Blocks, Wallet as WalletIcon, Zap } from "lucide-react";


const cryptoCards = [
  {
    icon: Coins,
    title: "C'est quoi une cryptomonnaie ?",
    description: "Une cryptomonnaie, c'est juste une forme d'argent numérique stockée dans un \"wallet\". Elle circule sur un grand registre public (la blockchain). Le but ? Pas besoin de banque ni d'autorisation, l'argent circule d'une personne à une autre via un système automatique et sécurisé.",
    image: image_199002b8d239883b54f1a2604082d866b15dbc74,
    span: "col-span-1"
  },
  {
    icon: Blocks,
    title: "La blockchain",
    description: "C'est comme un carnet qui : est public (tout le monde peut le lire), est impossible à effacer, est mis à jour automatiquement toutes les quelques secondes, et n'appartient à personne.",
    image: image_c91443a2f1e42cd1397e594daaf7f40f3246b356,
    span: "col-span-1"
  },
  {
    icon: WalletIcon,
    title: "Le wallet : ton compte crypto",
    description: "Il te donne : une adresse (comme un numéro IBAN), une clé privée (comme un mot de passe ultra important).",
    image: image_b77b3dd1c2eb8638468321c22264cb839f11ade4,
    span: "col-span-1"
  },
  {
    icon: Zap,
    title: "Payer en crypto",
    description: "C'est comme faire un virement. Il faut juste l'adresse du destinataire, la blockchain vérifie et confirme l'envoi. Elle ne dort jamais, les paiements fonctionnent donc 24h/24.",
    image: image_d33a6b545d4b1dc39db1b6c432a7bc1a2dba6c92,
    span: "col-span-1"
  },
  {
    icon: Blocks,
    title: "Smart Contract",
    description: "La loterie est intrucable. C'est un programme autonome qui exécute des règles automatiquement.",
    image: image_a8b37ae233f7de6082e6a5a74d5f6dfa9ade4e60,
    span: "col-span-1",
    hasLink: true
  }
];

export function Dashboard() {
  return (
    <section className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E1B051]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E1B051]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* Header section */}
        <div className="relative align-center">
          <div>
            <h2 className="text-4xl md:text-5xl text-white">
              Comprendre la crypto facilement
            </h2>
          </div>
        </div>

        {/* Info cards grid - 2 on top, 3 on bottom */}
        <div className="space-y-6">
          {/* First row - 2 cards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {cryptoCards.slice(0, 2).map((card, index) => (
    <Card 
      key={index}
      className="relative bg-gradient-to-br from-gray-900/80 to-black overflow-hidden group rounded-xl transition-all duration-500"
    >
      {/* Card Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <img 
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Text Section */}
      <div className="px-6 pb-5 pt-1 space-y-3">
        <h3 className="text-white font-medium">{card.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
      </div>
    </Card>
  ))}
</div>

          {/* Second row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cryptoCards.slice(2).map((card, index) => {
              // Only the last card (Smart Contract) gets the special two-section design
              if (index + 2 === 4) {
                return (
                  <Card 
                    key={index + 2}
                    className="relative bg-gradient-to-br from-gray-900/80 to-black overflow-hidden group hover:shadow-[0_8px_30px_rgba(163,230,53,0.15)] transition-all duration-300"
                  >
                    {/* Top Section - Stats with overlapping images */}
                    <div className="p-8 pb-6">
                      {/* Overlapping circular images */}
                      <div className="flex items-center mb-6">
                        <div className="flex -space-x-4">
                          <div className="w-16 h-16 rounded-full border-2 border-black overflow-hidden">
                            <img 
                              src={image_c5ca744fc3a9507fced4f2bf59c4f596da347e94}
                              alt="Person 1"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-16 h-16 rounded-full border-2 border-black overflow-hidden">
                            <img 
                              src={image_a8b37ae233f7de6082e6a5a74d5f6dfa9ade4e60}
                              alt="Person 2"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-16 h-16 rounded-full border-2 border-black overflow-hidden">
                            <img 
                              src={image_45ca0f5cca8c2e433c227408acd991a25e52f1fe}
                              alt="Person 3"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Stat text */}
                      <h3 className="text-white text-2xl leading-tight">
                        6,5 millions de Français en possèdent
                      </h3>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-800 mx-8" />

                    {/* Bottom Section - Smart Contract Info */}
                    <div className="p-8 pt-6 space-y-3">
                      <h3 className="text-white text-2xl">Smart Contract</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        La loterie est intrucable. C'est un programme autonome qui exécute des règles automatiquement.
                      </p>
                      
                      {/* Learn more link */}
                      <button className="inline-flex items-center gap-2 text-[#E1B051] hover:text-[#C18F28] transition-colors group/link mt-2">
                        <span className="text-sm">En savoir plus</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </Card>
                );
              }
              
              // All other cards use the original image + text format
              return (
                <Card 
                  key={index + 2}
                  className="relative bg-gradient-to-br from-gray-900/80 to-black overflow-hidden group hover: transition-all duration-300"
                >
                  {/* Card Image */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-[#C18F28]/20 to-purple-900/20 transition-all duration-300 group-hover:scale-105">
                    <img 
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-white">{card.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}