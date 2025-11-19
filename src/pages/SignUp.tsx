import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        alert("Inscription réussie ! 🎉 Vérifiez votre email pour confirmer votre compte.")
        navigate("/login")
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Erreur lors de l'inscription")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-lime-500/20 to-green-600/20 border-2 border-lime-500/50 rounded-xl p-8 backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
              Inscription
            </span>
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Créez votre compte pour participer à la loterie
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-lime-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-lime-500"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-lime-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-lime-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/40 border border-lime-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-lime-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-lime-400 to-green-500 text-black font-bold py-3 px-6 rounded-lg hover:from-lime-300 hover:to-green-400 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className={isLoading ? "text-gray-600 bg-lime-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-lime-300 transition-colors" : "bg-lime-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-lime-300 transition-colors"}>
                {isLoading ? "Inscription..." : "S'inscrire"}
              </span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-lime-400 hover:text-lime-300 font-semibold">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
