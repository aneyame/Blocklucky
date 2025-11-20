import image_880a28bba1f74c749db708df985411beb3b48e57 from '../assets/880a28bba1f74c749db708df985411beb3b48e57.png';
import { Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FooterProps {
  onHowItWorksClick?: () => void;
  onAboutClick?: () => void;
  onHomeClick?: () => void;
}

export function Footer({ onHowItWorksClick, onHomeClick }: FooterProps = {}) {
  return (
    <footer className="relative bg-black border-t border-gray-800/50 py-12 px-6">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 mb-8 rounded-full blur-3xl" style={{
        backgroundColor: 'rgba(168, 85, 247, 0.05)'
      }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid gap-8 mb-8" style={{
          gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(4, 1fr)' : '1fr'
        }}>
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ImageWithFallback 
                src={image_880a28bba1f74c749db708df985411beb3b48e57} 
                alt="Etherbay Lottery Logo"
                className="w-10 h-10 rounded-lg object-contain"
              />
              <span className="text-xl text-white" style={{ fontFamily: 'Aclonica, sans-serif' }}>Etherbay</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              La première loterie crypto solidaire. Participez avec des cryptomonnaies pour soutenir des causes caritatives.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center transition-all group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(225, 176, 81, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)';
                }}
              >
                <Facebook className="w-4 h-4 text-gray-400 transition-colors" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'} />
              </a>

              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center transition-all group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(225, 176, 81, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)';
                }}
              >
                <Twitter className="w-4 h-4 text-gray-400 transition-colors" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'} />
              </a>

              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center transition-all group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(225, 176, 81, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)';
                }}
              >
                <Instagram className="w-4 h-4 text-gray-400 transition-colors" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'} />
              </a>

              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center transition-all group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(225, 176, 81, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.5)';
                }}
              >
                <Youtube className="w-4 h-4 text-gray-400 transition-colors" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 transition-colors text-sm" onClick={onHomeClick} style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors text-sm" onClick={onHowItWorksClick} style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>
                  Comment ça marche
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors text-sm" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>
                  Nos causes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors text-sm" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors text-sm" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white mb-4">Ressources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 transition-colors text-sm" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>
                  Programme
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors text-sm" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>
                  Règlement
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors text-sm" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors text-sm" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 transition-colors text-sm" style={{ color: 'rgb(156, 163, 175)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}>
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgba(225, 176, 81, 1)' }} />
                <div>
                  <p className="text-gray-400 text-sm">contact@etherbay.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgba(225, 176, 81, 1)' }} />
                <div>
                  <p className="text-gray-400 text-sm">
                    Etherbay Event Center<br />
                    28-30 Novembre 2025
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/50 ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              © 2025 Etherbay Lottery. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{
              backgroundColor: 'rgba(225, 176, 81, 0.05)',
              border: '1px solid rgba(225, 176, 81, 0.2)'
            }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'rgba(225, 176, 81, 1)' }} />
              <span className="text-sm" style={{ color: 'rgba(225, 176, 81, 1)' }}>Événement du 28-30 Nov 2025</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}