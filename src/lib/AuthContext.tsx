import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { supabase } from "../lib/supabase"
import { getConnectedAccount } from "./wallet"

interface AuthContextType {
  user: any
  walletAddress: string | null
  linkWalletToUser: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  walletAddress: null,
  linkWalletToUser: async () => {},
  isLoading: true,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer l'utilisateur actuel
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      setUser(user)
      setIsLoading(false)
      
      // Récupérer l'adresse wallet depuis la table user_wallets
      if (user) {
        const { data: walletData } = await supabase
          .from('user_wallets')
          .select('wallet_address')
          .eq('user_id', user.id)
          .single()
        
        if (walletData?.wallet_address) {
          setWalletAddress(walletData.wallet_address)
        }
      }
    })

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        // Récupérer le wallet depuis la table
        const { data: walletData } = await supabase
          .from('user_wallets')
          .select('wallet_address')
          .eq('user_id', session.user.id)
          .single()
        
        if (walletData?.wallet_address) {
          setWalletAddress(walletData.wallet_address)
        } else {
          setWalletAddress(null)
        }
      } else {
        setWalletAddress(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const linkWalletToUser = async () => {
    const connectedWallet = getConnectedAccount()
    
    if (!connectedWallet) {
      throw new Error("Aucun wallet connecté")
    }

    if (!user) {
      throw new Error("Utilisateur non connecté")
    }

    try {
      // Vérifier si une entrée existe déjà
      const { data: existing } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (existing) {
        throw new Error("Ce compte est déjà associé à un wallet. Impossible de modifier.")
      }

      // Créer une nouvelle entrée (association unique et permanente)
      const { error } = await supabase
        .from('user_wallets')
        .insert({
          user_id: user.id,
          email: user.email,
          wallet_address: connectedWallet
        })

      if (error) {
        // Gestion des erreurs de contrainte unique
        if (error.code === '23505') {
          if (error.message.includes('wallet_address')) {
            throw new Error("Ce wallet est déjà associé à un autre compte.")
          }
          throw new Error("Ce compte est déjà associé à un wallet.")
        }
        throw error
      }

      setWalletAddress(connectedWallet)
      return
    } catch (error) {
      console.error("Erreur lors de l'association du wallet:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, walletAddress, linkWalletToUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
