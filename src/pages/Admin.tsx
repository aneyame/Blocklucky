import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { getConnectedAccount, getEthersProvider, CONTRACT_ADDRESS, subscribeToWalletChanges } from "../lib/wallet"
import { supabase } from "../lib/supabase"
import LotteryABI from "../lib/LotteryABI.json"

export function Admin() {
  const [account, setAccount] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [players, setPlayers] = useState<string[]>([])
  const [drawNumber, setDrawNumber] = useState<string>("")
  const [numberOfWinners, setNumberOfWinners] = useState<number>(3)
  const [winners, setWinners] = useState<string[]>([])
  const [drawHistory, setDrawHistory] = useState<Array<{ drawNumber: number, winners: string[] }>>([])
  const [walletEmails, setWalletEmails] = useState<Record<string, string>>({})
  const [contractBalance, setContractBalance] = useState<string>("0")
  const [seasonNumber, setSeasonNumber] = useState<string>("0")
  const [remainingDraws, setRemainingDraws] = useState<number>(6)

  useEffect(() => {
    const connectedAccount = getConnectedAccount()
    setAccount(connectedAccount)
    
    if (connectedAccount) {
      fetchLotteryInfo()
    }

    // S'abonner aux changements de wallet
    const unsubscribe = subscribeToWalletChanges((newAccount) => {
      console.log("Admin: Wallet changé →", newAccount)
      setAccount(newAccount)
      if (newAccount) {
        fetchLotteryInfo()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const fetchWalletEmails = async (wallets: string[]) => {
    try {
      const normalizedWallets = wallets.map(w => w.toLowerCase())
      console.log("🔍 Recherche des emails pour:", normalizedWallets)
      
      const { data, error } = await supabase
        .from('user_wallets')
        .select('wallet_address, email')
        .in('wallet_address', normalizedWallets)

      if (error) throw error

      console.log("📧 Données reçues de Supabase:", data)

      const emailMap: Record<string, string> = {}
      data?.forEach(row => {
        emailMap[row.wallet_address.toLowerCase()] = row.email
      })
      
      console.log("📋 Email Map créé:", emailMap)
      setWalletEmails(emailMap)
    } catch (err) {
      console.error("Erreur lors de la récupération des emails:", err)
    }
  }

  const fetchLotteryInfo = async () => {
    const provider = getEthersProvider()
    if (!provider) return

    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        LotteryABI,
        provider
      )

      const playersList = await contract.getPlayers()
      setPlayers(playersList)

      // Récupérer les emails pour tous les wallets
      if (playersList.length > 0) {
        await fetchWalletEmails(playersList)
      }

      const currentDraw = await contract.drawNumber()
      setDrawNumber(currentDraw.toString())

      // Récupérer les nouvelles données du contrat
      const season = await contract.seasonNumber()
      setSeasonNumber(season.toString())

      const balance = await contract.getContractBalance()
      setContractBalance(ethers.formatEther(balance))

      const remaining = await contract.getRemainingDraws()
      setRemainingDraws(Number(remaining))

      // Récupérer les gagnants du dernier tirage via les events
      if (currentDraw > 0) {
        const filter = contract.filters.WinnersPicked()
        const events = await contract.queryFilter(filter)
        
        // Construire l'historique de tous les tirages
        const history: Array<{ drawNumber: number, winners: string[] }> = []
        events.forEach((event) => {
          if ('args' in event) {
            history.push({
              drawNumber: Number(event.args.drawNumber),
              winners: event.args.winners as string[]
            })
          }
        })
        setDrawHistory(history.reverse()) // Plus récent en premier
        
        // Récupérer les emails pour tous les gagnants
        const allWinners = history.flatMap(h => h.winners)
        if (allWinners.length > 0) {
          await fetchWalletEmails(allWinners)
        }
        
        // Garder les gagnants du dernier tirage
        const latestEvent = events[events.length - 1]
        if (latestEvent && 'args' in latestEvent) {
          setWinners(latestEvent.args.winners as string[])
        }
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des infos:", err)
    }
  }

  const handlePickWinners = async () => {
    if (!account) {
      alert("Veuillez connecter votre wallet!")
      return
    }

    setIsLoading(true)
    try {
      // Récupérer un provider frais depuis MetaMask
      if (!window.ethereum) {
        alert("MetaMask n'est pas installé!")
        return
      }

      // Créer un nouveau provider pour être sûr d'avoir le bon compte
      const freshProvider = new ethers.BrowserProvider(window.ethereum)
      const signer = await freshProvider.getSigner()
      const signerAddress = await signer.getAddress()

      console.log("Compte connecté dans MetaMask:", signerAddress)
      console.log("Compte attendu:", account)

      // Vérifier que c'est bien le même compte
      if (signerAddress.toLowerCase() !== account.toLowerCase()) {
        alert(`Erreur: Le compte MetaMask actif (${signerAddress}) ne correspond pas au compte connecté (${account}).\n\nVeuillez rafraîchir la page après avoir changé de compte dans MetaMask.`)
        return
      }

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        LotteryABI,
        signer
      )

      const tx = await contract.pickWinners(numberOfWinners)
      alert("Transaction en cours... Veuillez patienter.")
      await tx.wait()
      alert(`Tirage effectué avec succès! 🎉\n${numberOfWinners} gagnant(s) sélectionné(s)!`)
      
      // Rafraîchir les infos
      await fetchLotteryInfo()
    } catch (err: any) {
      console.error(err)
      
      if (err.code === "ACTION_REJECTED") {
        alert("Transaction annulée par l'utilisateur.")
      } else if (err.message.includes("execution reverted")) {
        alert("Transaction refusée par le smart contract.\n\nVérifiez que:\n• Vous êtes bien le propriétaire du contrat\n• Il y a au moins 1 participant\n• Le nombre de gagnants est valide")
      } else {
        alert("Erreur lors du tirage: " + err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleWithdrawFunds = async () => {
    if (!account) {
      alert("Veuillez connecter votre wallet!")
      return
    }

    if (!confirm("Êtes-vous sûr de vouloir retirer les fonds du contrat ?")) {
      return
    }

    setIsLoading(true)
    try {
      const freshProvider = new ethers.BrowserProvider(window.ethereum!)
      const signer = await freshProvider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LotteryABI, signer)

      const tx = await contract.withdrawFunds()
      alert("Transaction en cours... Veuillez patienter.")
      await tx.wait()
      alert(`Fonds retirés avec succès! 💰`)
      
      await fetchLotteryInfo()
    } catch (err: any) {
      console.error(err)
      if (err.code === "ACTION_REJECTED") {
        alert("Transaction annulée par l'utilisateur.")
      } else if (err.message.includes("Season not finished yet")) {
        alert("Erreur: La saison n'est pas encore terminée. Vous devez effectuer les 6 tirages.")
      } else {
        alert("Erreur lors du retrait: " + err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmergencyWithdraw = async () => {
    if (!account) {
      alert("Veuillez connecter votre wallet!")
      return
    }

    if (!confirm("⚠️ RETRAIT D'URGENCE ⚠️\n\nCette action retire immédiatement tous les fonds, même si la saison n'est pas terminée.\n\nÊtes-vous absolument sûr ?")) {
      return
    }

    setIsLoading(true)
    try {
      const freshProvider = new ethers.BrowserProvider(window.ethereum!)
      const signer = await freshProvider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LotteryABI, signer)

      const tx = await contract.emergencyWithdraw()
      alert("Transaction en cours... Veuillez patienter.")
      await tx.wait()
      alert(`Retrait d'urgence effectué! 💰`)
      
      await fetchLotteryInfo()
    } catch (err: any) {
      console.error(err)
      if (err.code === "ACTION_REJECTED") {
        alert("Transaction annulée par l'utilisateur.")
      } else {
        alert("Erreur lors du retrait d'urgence: " + err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartNewSeason = async () => {
    if (!account) {
      alert("Veuillez connecter votre wallet!")
      return
    }

    if (!confirm("Démarrer une nouvelle saison ?\n\nCela réinitialisera la liste des participants et le compteur de tirages.")) {
      return
    }

    setIsLoading(true)
    try {
      const freshProvider = new ethers.BrowserProvider(window.ethereum!)
      const signer = await freshProvider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LotteryABI, signer)

      const tx = await contract.startNewSeason()
      alert("Transaction en cours... Veuillez patienter.")
      await tx.wait()
      alert(`Nouvelle saison démarrée! 🎉`)
      
      await fetchLotteryInfo()
    } catch (err: any) {
      console.error(err)
      if (err.code === "ACTION_REJECTED") {
        alert("Transaction annulée par l'utilisateur.")
      } else if (err.message.includes("Current season not finished")) {
        alert("Erreur: La saison actuelle n'est pas terminée. Vous devez effectuer les 6 tirages.")
      } else {
        alert("Erreur: " + err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleForceNewSeason = async () => {
    if (!account) {
      alert("Veuillez connecter votre wallet!")
      return
    }

    if (!confirm("⚠️ FORCER UNE NOUVELLE SAISON ⚠️\n\nCette action réinitialise immédiatement, même si les 6 tirages ne sont pas terminés.\n\nUtilisez cette fonction uniquement pour les TESTS.\n\nContinuer ?")) {
      return
    }

    setIsLoading(true)
    try {
      const freshProvider = new ethers.BrowserProvider(window.ethereum!)
      const signer = await freshProvider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LotteryABI, signer)

      const tx = await contract.forceNewSeason()
      alert("Transaction en cours... Veuillez patienter.")
      await tx.wait()
      alert(`Nouvelle saison forcée! 🔄`)
      
      await fetchLotteryInfo()
    } catch (err: any) {
      console.error(err)
      if (err.code === "ACTION_REJECTED") {
        alert("Transaction annulée par l'utilisateur.")
      } else {
        alert("Erreur: " + err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-3">
            <span className="bg-gradient-to-r from-lime-400 to-purple-400 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Gérer la loterie et lancer les tirages</p>
        </div>

        {/* Wallet Status */}
        {!account ? (
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border-2 border-red-500/50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <p className="text-white font-semibold text-lg">Wallet non connecté</p>
                <p className="text-gray-400 text-sm">Veuillez connecter votre wallet admin pour continuer</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-lime-500/10 to-green-600/10 border-2 border-lime-500/50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✓</span>
              <div className="flex-1">
                <p className="text-lime-400 font-semibold text-sm mb-1">CONNECTÉ EN TANT QUE ADMIN</p>
                <p className="text-white font-mono text-sm break-all">{account}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Informations de la loterie */}
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-purple-400">📊</span> Statistiques
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-300 text-sm font-medium mb-1">SAISON N°</p>
                <p className="text-white text-2xl font-bold">{seasonNumber}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm font-medium mb-1">TIRAGE N°</p>
                <p className="text-white text-3xl font-bold">{drawNumber || "..."}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm font-medium mb-1">TIRAGES RESTANTS</p>
                <p className="text-white text-2xl font-bold">{remainingDraws}/6</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm font-medium mb-1">PARTICIPANTS</p>
                <p className="text-white text-3xl font-bold">{players.length}</p>
              </div>
              <div className="pt-2 border-t border-purple-500/30">
                <p className="text-gray-300 text-sm font-medium mb-1">SOLDE DU CONTRAT</p>
                <p className="text-lime-400 text-2xl font-bold">{contractBalance} ETH</p>
              </div>
            </div>
          </div>

          {/* Bouton de tirage */}
          <div className="bg-gradient-to-br from-lime-500/20 to-green-600/20 border-2 border-lime-500/50 rounded-xl p-6 backdrop-blur-sm flex flex-col">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-lime-400">🎲</span> Tirage au sort
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                Sélectionne les gagnants et distribue automatiquement les récompenses.
              </p>
              <div className="mb-6">
                <label className="text-white text-sm font-medium mb-2 block">
                  Nombre de gagnants
                </label>
                <input
                  type="number"
                  min="1"
                  max={players.length}
                  value={numberOfWinners}
                  onChange={(e) => setNumberOfWinners(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-black/40 border border-lime-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-lime-500"
                  disabled={!account || players.length === 0}
                />
              </div>
            </div>
            <button
              onClick={handlePickWinners}
              disabled={isLoading || !account || players.length === 0}
              className="w-full bg-gradient-to-r from-lime-400 to-green-500 text-black font-bold py-4 px-6 rounded-lg hover:from-lime-300 hover:to-green-400 transition-all transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:hover:from-lime-400 disabled:hover:to-green-500 shadow-lg shadow-lime-500/30"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Tirage en cours...
                </span>
              ) : (
                "🎲 Lancer le tirage"
              )}
            </button>
            {players.length === 0 && account && (
              <p className="text-gray-400 text-sm mt-3 text-center">
                Aucun participant pour le moment
              </p>
            )}
          </div>
        </div>

        {/* Gestion des fonds et saisons */}
        {account && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Gestion des fonds */}
            <div className="bg-gradient-to-br from-green-900/50 to-emerald-800/30 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-green-400">💰</span> Gestion des fonds
              </h2>
              <div className="space-y-3">
                <button
                  onClick={handleWithdrawFunds}
                  disabled={isLoading || remainingDraws > 0}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  💵 Retirer les fonds
                </button>
                {remainingDraws > 0 && (
                  <p className="text-gray-400 text-xs text-center">
                    Disponible après les 6 tirages ({remainingDraws} restant{remainingDraws > 1 ? 's' : ''})
                  </p>
                )}
                <button
                  onClick={handleEmergencyWithdraw}
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ⚠️ Retrait d'urgence
                </button>
                <p className="text-gray-400 text-xs text-center">
                  Utiliser uniquement en cas de problème critique
                </p>
              </div>
            </div>

            {/* Gestion des saisons */}
            <div className="bg-gradient-to-br from-blue-900/50 to-indigo-800/30 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-blue-400">🔄</span> Gestion des saisons
              </h2>
              <div className="space-y-3">
                <button
                  onClick={handleStartNewSeason}
                  disabled={isLoading || remainingDraws > 0}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  🎉 Nouvelle saison
                </button>
                {remainingDraws > 0 && (
                  <p className="text-gray-400 text-xs text-center">
                    Disponible après les 6 tirages ({remainingDraws} restant{remainingDraws > 1 ? 's' : ''})
                  </p>
                )}
                <button
                  onClick={handleForceNewSeason}
                  disabled={isLoading}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  🔧 Forcer nouvelle saison (TEST)
                </button>
                <p className="text-gray-400 text-xs text-center">
                  Réinitialise immédiatement pour les tests
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Liste des participants */}
        {players.length > 0 && (
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-lime-400">👥</span> Liste des participants
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {players.map((player, index) => (
                <div 
                  key={index} 
                  className="bg-black/40 border border-gray-700/50 rounded-lg p-4 hover:border-lime-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lime-400 font-bold text-sm">#{index + 1}</span>
                    <div className="flex-1">
                      <p className="text-gray-300 font-mono text-sm break-all">{player}</p>
                      {walletEmails[player.toLowerCase()] && (
                        <p className="text-lime-400 text-xs mt-1">✉️ {walletEmails[player.toLowerCase()]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Liste des gagnants */}
        {winners.length > 0 && (
          <div className="bg-gradient-to-br from-yellow-900/50 to-orange-800/30 border-2 border-yellow-500/50 rounded-xl p-6 backdrop-blur-sm mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-yellow-400">🏆</span> Gagnants du dernier tirage
            </h2>
            <div className="space-y-3">
              {winners.map((winner, index) => (
                <div 
                  key={index} 
                  className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-lg p-4w-5ver:border-yellow-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-gray-300">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}</span>
                    <div className="flex-1">
                      <p className="text-gray-300 text-xs font-semibold mb-1">GAGNANT #{index + 1}</p>
                      <p className="text-white font-mono text-sm break-all">{winner}</p>
                      {walletEmails[winner.toLowerCase()] && (
                        <p className="text-lime-400 text-sm mt-1">✉️ {walletEmails[winner.toLowerCase()]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Historique de tous les tirages */}
        {drawHistory.length > 0 && (
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-800/30 border border-indigo-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-indigo-400">📜</span> Historique des tirages
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-indigo-500/30">
                    <th className="text-left py-3 px-4 text-white text-sm">Tirage N°</th>
                    <th className="text-left py-3 px-4 text-white text-sm">Nombre de gagnants</th>
                    <th className="text-left py-3 px-4 text-white text-sm">Gagnants</th>
                  </tr>
                </thead>
                <tbody>
                  {drawHistory.map((draw, drawIndex) => (
                    <tr key={drawIndex} className="border-b border-indigo-500/10 hover:bg-indigo-500/5 transition-colors">
                      <td className="py-4 px-4">
                        <span className="text-white font-bold text-lg">#{draw.drawNumber}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white font-semibold">{draw.winners.length}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-2">
                          {draw.winners.map((winner, winnerIndex) => (
                            <div key={winnerIndex} className="bg-black/20 rounded p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg text-gray-300">
                                  {winnerIndex === 0 ? '🥇' : winnerIndex === 1 ? '🥈' : winnerIndex === 2 ? '🥉' : '🏅'}
                                </span>
                                <span className="text-gray-300 font-mono text-xs break-all">{winner}</span>
                              </div>
                              {walletEmails[winner.toLowerCase()] && (
                                <span className="text-lime-400 text-xs ml-8">✉️ {walletEmails[winner.toLowerCase()]}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
