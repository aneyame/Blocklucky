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
    <div style={{ minHeight: '100vh', background: 'rgba(0, 0, 0, 1)', paddingBottom: '3rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto', width: '100%' }}>
        <div style={{ background: 'rgba(225, 176, 81, 0.1)', border: '1px solid rgba(225, 176, 81, 0.3)', borderRadius: '0.75rem', padding: '2rem', backdropFilter: 'blur(4px)' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'rgba(225, 176, 81, 1)', marginBottom: '0.5rem', textAlign: 'center' }}>
            Inscription
          </h1>
          <p style={{ color: 'rgba(156, 163, 175, 1)', textAlign: 'center', marginBottom: '2rem' }}>
            Créez votre compte pour participer à la loterie
          </p>

          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 1)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
              <p style={{ color: 'rgba(209, 213, 219, 1)', fontWeight: '600', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ color: 'rgba(255, 255, 255, 1)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(225, 176, 81, 0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: 'rgba(255, 255, 255, 1)', outline: 'none' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 1)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.3)'}
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label style={{ color: 'rgba(255, 255, 255, 1)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(225, 176, 81, 0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: 'rgba(255, 255, 255, 1)', outline: 'none' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 1)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.3)'}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label style={{ color: 'rgba(255, 255, 255, 1)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(225, 176, 81, 0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: 'rgba(255, 255, 255, 1)', outline: 'none' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 1)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.3)'}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{ width: '100%', background: 'rgba(138, 28, 38, 1)', color: 'rgba(255, 255, 255, 1)', fontWeight: '600', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', transition: 'background 0.2s', opacity: isLoading ? '0.5' : '1' }}
              onMouseEnter={(e) => !isLoading && (e.currentTarget.style.background = 'rgba(110, 14, 26, 1)')}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(138, 28, 38, 1)'}
            >
              {isLoading ? "Inscription..." : "S'inscrire"}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'rgba(156, 163, 175, 1)', fontSize: '0.875rem' }}>
              Déjà un compte ?{" "}
              <Link to="/login" style={{ color: 'rgba(225, 176, 81, 1)', fontWeight: '600', textDecoration: 'none' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 0.8)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(225, 176, 81, 1)'}>
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
