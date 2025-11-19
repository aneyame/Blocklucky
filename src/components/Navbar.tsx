import { Ticket, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { withConnectWallet } from "../lib/wallet";
import { supabase } from "../lib/supabase";
import { isAdmin } from "../lib/admin";

const ConnectWalletButton = withConnectWallet(({ onClick, children }: any) => (
  <button 
    onClick={onClick}
    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full transition-all hover:shadow-lg hover:shadow-purple-600/50"
  >
    {children}
  </button>
));

export function Navbar() {
  const [user, setUser] = useState<any>(null)
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

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    navigate("/")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">      
      <div className="max-w-7xl mx-auto flex items-center justify-between mt-[0px] mr-[0px] mb-[5px] ml-[0px] py-[0px] py-[13px] px-[24px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-lime-400/20 to-purple-400/20 flex items-center justify-center">
            <Ticket className="w-5 h-5 text-lime-400" />
          </div>
          <span className="text-white text-xl">Etherbay Lottery</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-400 hover:text-lime-400 transition-colors">
            Accueil
          </Link>
          <Link to="/#how-it-works" className="text-gray-400 hover:text-lime-400 transition-colors">
            Comment ça marche
          </Link>
          <Link to="/#about" className="text-gray-400 hover:text-lime-400 transition-colors">
            À propos
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          {user && (
            <ConnectWalletButton>
              Connecter mon wallet
            </ConnectWalletButton>
          )}
          
          {user ? (
            <>
              {!isAdmin(user?.email) && (
                <Link 
                  to="/participate"
                  className="px-6 py-2 bg-lime-400 hover:bg-lime-300 text-black rounded-full transition-all hover:shadow-lg hover:shadow-lime-400/50"
                >
                  Participer
                </Link>
              )}
              {isAdmin(user?.email) && (
                <Link 
                  to="/admin"
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-full transition-all hover:shadow-lg hover:shadow-orange-500/50"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-lime-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-lime-300 transition-colors"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full transition-all hover:shadow-lg hover:shadow-purple-600/50 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}