import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { isAdmin } from "../lib/admin"

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier la session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Écouter les changements
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    )
  }

  // Pas connecté → redirection login
  if (!session) {
    return <Navigate to="/login" replace />
  }

  // Connecté mais pas admin → redirection home avec message
  if (!isAdmin(session.user?.email)) {
    alert("Accès refusé : réservé aux administrateurs")
    return <Navigate to="/" replace />
  }

  // Admin → accès autorisé
  return <>{children}</>
}
