import { Ticket, User, Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { withConnectWallet } from "../lib/wallet";
import { supabase } from "../lib/supabase";
import { isAdmin } from "../lib/admin";

const ConnectWalletButton = withConnectWallet(({ onClick, children, scrolled }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: 'rgba(255, 255, 255, 1)',
        borderRadius: '9999px',
        transition: 'all 1200ms ease-in-out',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: scrolled ? '8px' : '8px 24px',
        background: isHovered ? 'rgba(138, 28, 38, 1)' : 'rgba(110, 14, 26, 1)',
        boxShadow: isHovered ? '0 10px 15px -3px rgba(138, 28, 38, 0.4), 0 4px 6px -4px rgba(138, 28, 38, 0.4)' : 'none',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      <Wallet style={{ width: '16px', height: '16px', transition: 'all 1200ms ease-in-out' }} />
      <span style={{
        transition: 'all 1200ms ease-in-out',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: scrolled ? '0' : 'auto',
        opacity: scrolled ? 0 : 1
      }}>{children}</span>
    </button>
  );
});

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Vérifier la session au chargement
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Gérer le scroll
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        setScrolled(window.scrollY > heroBottom - 100)
      } else {
        setScrolled(window.scrollY > 100)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    navigate("/")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-1200 ease-in-out" style={{ paddingTop: scrolled ? '12px' : '24px' }}>
      <div className={`mx-auto transition-all duration-1200 ease-in-out ${
        scrolled ? 'max-w-4xl' : 'max-w-7xl'
      }`}>
        <div className={`flex items-center backdrop-blur-xl bg-black/40 border border-white/10 rounded-full shadow-2xl transition-all duration-1200 ease-in-out ${
          scrolled ? 'py-3 px-6 justify-between gap-4' : 'py-4 px-8 justify-between gap-8'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div 
              className={`rounded-lg flex items-center justify-center transition-all duration-1200 ease-in-out ${
                scrolled ? 'w-8 h-8' : 'w-10 h-10'
              }`}
              style={{
                background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 0.2), rgba(138, 28, 38, 0.2))'
              }}
            >
              <Ticket 
                className={`transition-all duration-1200 ease-in-out ${
                  scrolled ? 'w-4 h-4' : 'w-5 h-5'
                }`}
                style={{ color: 'rgba(225, 176, 81, 1)' }}
              />
            </div>
            <span className={`text-white transition-all duration-1200 ease-in-out ${
              scrolled ? 'text-base' : 'text-lg'
            }`} style={{ fontFamily: 'Aclonica, sans-serif' }}>
              Etherbay Lottery
            </span>
          </Link>

          {/* Navigation Links */}
          <div className={`hidden md:flex items-center transition-all duration-1200 ease-in-out ${
            scrolled ? 'gap-6' : 'gap-8'
          }`}>
            <Link 
              to="/" 
              className={`text-gray-300 transition-all duration-1200 ease-in-out whitespace-nowrap ${
                scrolled ? 'text-sm' : ''
              }`}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              Accueil
            </Link>
            <Link 
              to="/HowitWorksPage" 
              className={`text-gray-300 transition-all duration-1200 ease-in-out whitespace-nowrap ${
                scrolled ? 'text-sm' : ''
              }`}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              Comment ça marche
            </Link>
            <Link 
              to="/AboutPage" 
              className={`text-gray-300 transition-all duration-1200 ease-in-out whitespace-nowrap ${
                scrolled ? 'text-sm' : ''
              }`}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              À propos
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className={`flex items-center transition-all duration-1200 ease-in-out ${
            scrolled ? 'gap-2' : 'gap-3'
          }`}>
            {user && (
              <ConnectWalletButton scrolled={scrolled}>
                Connecter mon wallet
              </ConnectWalletButton>
            )}
            
            {user ? (
              <>
                {!isAdmin(user?.email) && (
                  <Link 
                    to="/participate"
                    className={`brightness-110 text-black rounded-full transition-all duration-1200 ease-in-out flex items-center gap-2 ${
                      scrolled ? 'px-3 py-2' : 'px-6 py-2'
                    }`}
                    style={{
                      background: 'linear-gradient(to right, rgba(193, 143, 40, 1), rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(225, 176, 81, 0.4), 0 4px 6px -4px rgba(225, 176, 81, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <User className={`transition-all duration-1200 ease-in-out ${scrolled ? 'w-4 h-4' : 'w-4 h-4'}`} />
                    <span className={`transition-all duration-1200 ease-in-out whitespace-nowrap overflow-hidden ${
                      scrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'
                    }`}>Participer</span>
                  </Link>
                )}
                {isAdmin(user?.email) && (
                  <Link 
                    to="/admin"
                    className={`bg-orange-500 hover:bg-orange-400 text-white rounded-full transition-all duration-1200 ease-in-out hover:shadow-lg hover:shadow-orange-500/50 flex items-center gap-2 ${
                      scrolled ? 'px-3 py-2' : 'px-6 py-2'
                    }`}
                  >
                    <User className={`transition-all duration-1200 ease-in-out ${scrolled ? 'w-4 h-4' : 'w-4 h-4'}`} />
                    <span className={`transition-all duration-1200 ease-in-out whitespace-nowrap overflow-hidden ${
                      scrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'
                    }`}>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className={`bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 rounded-full transition-all duration-1200 ease-in-out border border-gray-400/30 hover:border-gray-400/50 ${
                    scrolled ? 'px-3 py-2 text-sm' : 'px-4 py-2'
                  }`}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className={`bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 rounded-full transition-all duration-1200 ease-in-out border border-gray-400/30 hover:border-gray-400/50 flex items-center gap-2 ${
                  scrolled ? 'px-3 py-2' : 'px-4 py-2'
                }`}
              >
                <User className={`transition-all duration-1200 ease-in-out ${scrolled ? 'w-4 h-4' : 'w-4 h-4'}`} />
                <span className={`transition-all duration-1200 ease-in-out whitespace-nowrap overflow-hidden ${
                  scrolled ? 'w-0 opacity-0' : 'w-auto opacity-100 text-sm'
                }`}>Connexion</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}