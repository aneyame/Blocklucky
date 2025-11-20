import { useState } from "react";
import { ArrowLeft, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

export function LoginPage({ onBack, onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simuler une requête de connexion
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Identifiants de démonstration
    if (email === "admin@etherbay.com" && password === "admin123") {
      onLoginSuccess();
    } else {
      setError("Email ou mot de passe incorrect");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#E1B051]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8A1C26]/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </button>
      </div>

      {/* Login Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#E1B051] to-[#C18F28] mb-4 shadow-[0_0_40px_rgba(225,176,81,0.4)]">
              <Lock className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-3xl mb-2">Connexion Admin</h1>
            <p className="text-white/60">Accédez au tableau de bord de gestion</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Container */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-[#8A1C26]/20 border border-[#8A1C26]/40 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#E1B051] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/90">{error}</p>
                </div>
              )}

              {/* Demo Credentials Info */}
              <div className="mb-6 p-4 bg-[#E1B051]/10 border border-[#E1B051]/30 rounded-lg">
                <p className="text-sm text-white/80 mb-2">
                  <span className="text-[#E1B051]">Identifiants de démonstration :</span>
                </p>
                <p className="text-sm text-white/60">Email: admin@etherbay.com</p>
                <p className="text-sm text-white/60">Mot de passe: admin123</p>
              </div>

              {/* Email Input */}
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm text-white/80 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E1B051] focus:border-transparent transition-all text-white placeholder:text-white/30"
                    placeholder="admin@etherbay.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm text-white/80 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E1B051] focus:border-transparent transition-all text-white placeholder:text-white/30"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-[#C18F28] via-[#E1B051] to-[#C18F28] text-black rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(225,176,81,0.5)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <span className="flex justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Connexion en cours...
                  </span>
                ) : (
                  "Se connecter"
                )}
              </button>
            </div>
          </form>

          {/* Footer Info */}
          <p className="text-center text-white/40 text-sm mt-6">
            Cette page est protégée et réservée aux administrateurs
          </p>
        </div>
      </div>
    </div>
  );
}