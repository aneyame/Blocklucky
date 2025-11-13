import image_a8b37ae233f7de6082e6a5a74d5f6dfa9ade4e60 from 'figma:asset/a8b37ae233f7de6082e6a5a74d5f6dfa9ade4e60.png';
import image_c5c3252e015834012d3df4c262c1bd36e00b399a from 'figma:asset/c5c3252e015834012d3df4c262c1bd36e00b399a.png';
import image_906dde62ccd59026a688442fdfde602d2ccafb99 from 'figma:asset/906dde62ccd59026a688442fdfde602d2ccafb99.png';
import image_a84bac59490bc9db33817025853566e5daaf7dc7 from 'figma:asset/a84bac59490bc9db33817025853566e5daaf7dc7.png';
import image_1d65a51c096acab9b6e363399c84f4ab84d222cc from 'figma:asset/1d65a51c096acab9b6e363399c84f4ab84d222cc.png';
import { Card } from "./ui/card";
import { ArrowRight, Coins, Blocks, Wallet as WalletIcon, Zap } from "lucide-react";
import dashboardImage from "figma:asset/7c16d0b0603316f2c555b608c2d58a73bb3f6bfe.png";

const cryptoCards = [
  {
    icon: Coins,
    title: "C'est quoi une cryptomonnaie ?",
    description: "Une cryptomonnaie, c'est juste une forme d'argent numérique stockée dans un \"wallet\". Elle circule sur un grand registre public (la blockchain). Le but ? Pas besoin de banque ni d'autorisation, l'argent circule d'une personne à une autre via un système automatique et sécurisé.",
    image: image_1d65a51c096acab9b6e363399c84f4ab84d222cc,
    span: "col-span-1"
  },
  {
    icon: Blocks,
    title: "La blockchain",
    description: "C'est comme un carnet qui : est public (tout le monde peut le lire), est impossible à effacer, est mis à jour automatiquement toutes les quelques secondes, et n'appartient à personne.",
    image: image_a84bac59490bc9db33817025853566e5daaf7dc7,
    span: "col-span-1"
  },
  {
    icon: WalletIcon,
    title: "Le wallet : ton compte crypto",
    description: "Il te donne : une adresse (comme un numéro IBAN), une clé privée (comme un mot de passe ultra important).",
    image: image_906dde62ccd59026a688442fdfde602d2ccafb99,
    span: "col-span-1"
  },
  {
    icon: Zap,
    title: "Payer en crypto",
    description: "C'est comme faire un virement. Il faut juste l'adresse du destinataire, la blockchain vérifie et confirme l'envoi. Elle ne dort jamais, les paiements fonctionnent donc 24h/24.",
    image: image_c5c3252e015834012d3df4c262c1bd36e00b399a,
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
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* Header section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl text-white">
              Comprendre la crypto facilement
            </h2>
          </div>
          <div className="flex items-start justify-end">
            <p className="text-gray-400 text-right max-w-md">
              Cette loterie sert avant tout à vous introduire à ce monde là. Voici quelques explications rapides.
            </p>
          </div>
        </div>

        {/* Info cards grid - 2 on top, 3 on bottom */}
        <div className="space-y-6">
          {/* First row - 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cryptoCards.slice(0, 2).map((card, index) => (
              <Card 
                key={index}
                className="relative bg-gradient-to-br from-gray-900 to-black border-lime-500/20 overflow-hidden group hover:border-lime-400/40 transition-all duration-300"
              >
                {/* Card Image */}
                <div className="relative w-full h-56 bg-gradient-to-br from-lime-900/20 to-purple-900/20">
                  <img 
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="px-6 pb-5 pt-2 space-y-2">
                  <h3 className="text-white">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Second row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cryptoCards.slice(2).map((card, index) => (
              <Card 
                key={index + 2}
                className="relative bg-gradient-to-br from-gray-900 to-black border-lime-500/20 overflow-hidden group hover:border-lime-400/40 transition-all duration-300"
              >
                {/* Card Image */}
                <div className="relative w-full h-48 bg-gradient-to-br from-lime-900/20 to-purple-900/20">
                  <img 
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-3">
                  {/* Special badge for Smart Contract card */}
                  {index + 2 === 4 && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-lime-400/30 mb-2">
                      <span className="text-lime-400 text-xs">6,5 millions de Français possèdent des cryptos</span>
                    </div>
                  )}
                  
                  <h3 className="text-white">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
                  
                  {/* Learn more link for Smart Contract card */}
                  {card.hasLink && (
                    <button className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors group/link mt-2">
                      <span className="text-sm">En savoir plus</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}