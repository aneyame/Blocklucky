import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { getConnectedAccount, getEthersProvider, CONTRACT_ADDRESS, subscribeToWalletChanges } from "../lib/wallet"
import { supabase } from "../lib/supabase"
import LotteryABI from "../lib/LotteryABI.json"
import { DollarSign, Users, TrendingUp } from "lucide-react";
import { Card } from "../components/ui/card";


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
    <div className="min-h-screen bg-black py-24 px-6">
      {/* Background effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(138, 28, 38, 0.1)' }} />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(225, 176, 81, 0.1)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div style={{height : '100px'}}>
          </div>
          <h1 className="text-4xl md:text-5xl text-white mb-8">
            Tableau de bord Manager
          </h1>
          <p style={{ color: 'rgba(156, 163, 175, 1)' }}>
            Gérez la loterie et suivez les statistiques en temps réel
          </p>
        </div>

        {/* Wallet Status */}
        {!account ? (
          <div className="rounded-xl p-6 mb-8" style={{ background: 'linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))', borderWidth: '2px', borderStyle: 'solid', borderColor: 'rgba(239, 68, 68, 0.5)' }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <p className="text-white font-semibold text-lg">Wallet non connecté</p>
                <p className="text-sm" style={{ color: 'rgba(156, 163, 175, 1)' }}>Veuillez connecter votre wallet admin pour continuer</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl p-6 mb-8" style={{ background: 'linear-gradient(to right, rgba(132, 204, 22, 0.1), rgba(22, 163, 74, 0.1))', borderWidth: '2px', borderStyle: 'solid', borderColor: 'rgba(132, 204, 22, 0.5)' }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">✓</span>
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1" style={{ color: 'rgba(163, 230, 53, 1)' }}>CONNECTÉ EN TANT QUE ADMIN</p>
                <p className="text-white font-mono text-sm break-all">{account}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.2)' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(225, 176, 81, 0.1)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.3)' }}>
                <Users className="h-10 w-10" style={{ padding: '7px', color: 'rgba(225, 176, 81, 1)' }} />
              </div>
            </div>
            <p style={{ color: 'rgba(156, 163, 175, 1)' }}>Participants</p>
            <p className="text-3xl font-bold text-white">{players.length}</p>
          </Card>

          <Card className="p-6" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(138, 28, 38, 0.2)' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(138, 28, 38, 0.1)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(138, 28, 38, 0.3)' }}>
                <DollarSign className="h-10 w-10" style={{ padding: '7px', color: 'rgba(138, 28, 38, 1)' }} />
              </div>
            </div>
            <p style={{ color: 'rgba(156, 163, 175, 1)' }}>Solde du contrat en ETH</p>
            <p className="text-lg font-bold text-white">{contractBalance} ETH</p>
          </Card>

          <Card className="p-6" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.2)' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(225, 176, 81, 0.1)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.3)' }}>
                <DollarSign className="h-10 w-10" style={{ padding: '7px', color: 'rgba(225, 176, 81, 1)' }} />
              </div>
            </div>
            <p  style={{ color: 'rgba(156, 163, 175, 1)' }}>Solde du contrat en €</p>
            <p className="text-3xl font-bold text-white">{(parseFloat(contractBalance) * 2472.698)} €</p>
          </Card>

          <Card className="p-6" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(138, 28, 38, 0.2)' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(138, 28, 38, 0.1)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(138, 28, 38, 0.3)' }}>
                <TrendingUp className="h-10 w-10" style={{ padding: '7px', color: 'rgba(138, 28, 38, 1)' }} />
              </div>
            </div>
            <p style={{ color: 'rgba(156, 163, 175, 1)' }}>Tirages restants</p>
            <p className="text-3xl font-bold text-white">{remainingDraws}/6</p>
          </Card>
        </div>

        {/* Statistiques et Tirage */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 mt-16">
          {/* Informations détaillées */}
          <div className="rounded-xl p-6" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(75, 85, 99, 0.3)', backdropFilter: 'blur(8px)' }}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span style={{ color: 'rgba(156, 163, 175, 1)' }}>📊</span> Statistiques
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgba(209, 213, 219, 1)' }}>SAISON N°</p>
                <p className="text-white text-2xl font-bold">{seasonNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgba(209, 213, 219, 1)' }}>TIRAGE N°</p>
                <p className="text-white text-3xl font-bold">{drawNumber || "..."}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgba(209, 213, 219, 1)' }}>TIRAGES RESTANTS</p>
                <p className="text-white text-2xl font-bold">{remainingDraws}/6</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgba(209, 213, 219, 1)' }}>PARTICIPANTS</p>
                <p className="text-white text-3xl font-bold">{players.length}</p>
              </div>
              <div className="pt-2" style={{ borderTop: '1px solid rgba(75, 85, 99, 0.3)' }}>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgba(209, 213, 219, 1)' }}>SOLDE DU CONTRAT</p>
                <p className="text-2xl font-bold" style={{ color: 'rgba(225, 176, 81, 1)' }}>{contractBalance} ETH</p>
              </div>
            </div>
          </div>

          {/* Bouton de tirage */}
          <div className="rounded-xl p-6 flex flex-col" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.3)', backdropFilter: 'blur(8px)' }}>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span style={{ color: 'rgba(225, 176, 81, 1)' }}>🎲</span> Tirage au sort
              </h2>
              <p className="text-sm mb-4" style={{ color: 'rgba(209, 213, 219, 1)' }}>
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
                  className="w-full rounded-lg px-4 py-2 text-white focus:outline-none"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(75, 85, 99, 0.5)' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 1)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)'}
                  disabled={!account || players.length === 0}
                />
              </div>
            </div>
            <button
              onClick={handlePickWinners}
              disabled={isLoading || !account || players.length === 0}
              className="w-full font-bold py-4 px-6 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ 
                background: (isLoading || !account || players.length === 0) 
                  ? 'rgba(138, 28, 38, 0.7)' 
                  : 'rgba(138, 28, 38, 1)',
                color: 'rgba(255, 255, 255, 1)',
                boxShadow: '0 4px 6px -1px rgba(138, 28, 38, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && account && players.length > 0) {
                  e.currentTarget.style.background = 'rgba(185, 28, 28, 1)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && account && players.length > 0) {
                  e.currentTarget.style.background = 'rgba(138, 28, 38, 1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
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
              <p className="text-sm mt-3 text-center" style={{ color: 'rgba(156, 163, 175, 1)' }}>
                Aucun participant pour le moment
              </p>
            )}
          </div>
        </div>

        {/* Gestion des fonds et saisons */}
        {account && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Gestion des fonds */}
            <div className="rounded-xl p-6" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(75, 85, 99, 0.3)', backdropFilter: 'blur(8px)' }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span style={{ color: 'rgba(156, 163, 175, 1)' }}>💰</span> Gestion des fonds
              </h2>
              <div className="space-y-3">
                <div className="flex justify-center">
                  <button
                    onClick={handleWithdrawFunds}
                    disabled={isLoading || remainingDraws > 0}
                    className="h-10 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: 'rgba(75, 85, 99, 1)' }}
                    onMouseEnter={(e) => !isLoading && remainingDraws === 0 && (e.currentTarget.style.backgroundColor = 'rgba(107, 114, 128, 1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(75, 85, 99, 1)')}
                  >
                    💵 Retirer les fonds
                  </button>
                </div>
                {remainingDraws > 0 && (
                  <p className="text-xs text-center" style={{ color: 'rgba(156, 163, 175, 1)' }}>
                    Disponible après les 6 tirages ({remainingDraws} restant{remainingDraws > 1 ? 's' : ''})
                  </p>
                )}
                <div className="flex justify-center">
                  <button
                    onClick={handleEmergencyWithdraw}
                    disabled={isLoading}
                    className="h-10 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: 'rgba(138, 28, 38, 1)' }}
                    onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'rgba(185, 28, 28, 1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(138, 28, 38, 1)')}
                  >
                    ⚠️ Retrait d'urgence
                  </button>
                </div>
                <p className="text-xs text-center" style={{ color: 'rgba(156, 163, 175, 1)' }}>
                  Utiliser uniquement en cas de problème critique
                </p>
              </div>
            </div>

            {/* Gestion des saisons */}
            <div className="rounded-xl p-6" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(75, 85, 99, 0.3)', backdropFilter: 'blur(8px)' }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span style={{ color: 'rgba(156, 163, 175, 1)' }}>🔄</span> Gestion des saisons
              </h2>
              <div className="space-y-3">
                <div className="flex justify-center">
                  <button
                    onClick={handleStartNewSeason}
                    disabled={isLoading || remainingDraws > 0}
                    className="h-10 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: 'rgba(75, 85, 99, 1)' }}
                    onMouseEnter={(e) => !isLoading && remainingDraws === 0 && (e.currentTarget.style.backgroundColor = 'rgba(107, 114, 128, 1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(75, 85, 99, 1)')}
                  >
                    🎉 Nouvelle saison
                  </button>
                </div>
                {remainingDraws > 0 && (
                  <p className="text-xs text-center" style={{ color: 'rgba(156, 163, 175, 1)' }}>
                    Disponible après les 6 tirages ({remainingDraws} restant{remainingDraws > 1 ? 's' : ''})
                  </p>
                )}
                <div className="flex justify-center">
                  <button
                    onClick={handleForceNewSeason}
                    disabled={isLoading}
                    className="h-10 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: 'rgba(138, 28, 38, 1)' }}
                    onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'rgba(185, 28, 28, 1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(138, 28, 38, 1)')}
                  >
                    🔧 Forcer nouvelle saison (TEST)
                  </button>
                </div>
                <p className="text-xs text-center" style={{ color: 'rgba(156, 163, 175, 1)' }}>
                  Réinitialise immédiatement
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Liste des participants */}
        {players.length > 0 && (
          <div className="rounded-xl p-6 mb-8" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(75, 85, 99, 0.3)', backdropFilter: 'blur(8px)' }}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span style={{ color: 'rgba(225, 176, 81, 1)' }}>👥</span> Liste des participants
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {players.map((player, index) => (
                <div 
                  key={index} 
                  className="rounded-lg p-4 transition-colors"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(75, 85, 99, 0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.5)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)'}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm" style={{ color: 'rgba(225, 176, 81, 1)' }}>#{index + 1}</span>
                    <div className="flex-1">
                      <p className="font-mono text-sm break-all" style={{ color: 'rgba(209, 213, 219, 1)' }}>{player}</p>
                      {walletEmails[player.toLowerCase()] && (
                        <p className="text-xs mt-1" style={{ color: 'rgba(225, 176, 81, 1)' }}>✉️ {walletEmails[player.toLowerCase()]}</p>
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
          <div className="rounded-xl p-6 mb-8" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.3)', backdropFilter: 'blur(8px)' }}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span style={{ color: 'rgba(225, 176, 81, 1)' }}>🏆</span> Gagnants du dernier tirage
            </h2>
            <div className="space-y-3">
              {winners.map((winner, index) => (
                <div 
                  key={index} 
                  className="rounded-lg p-4 transition-colors"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.3)' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 1)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.3)'}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" style={{ color: 'rgba(209, 213, 219, 1)' }}>{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}</span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold mb-1" style={{ color: 'rgba(209, 213, 219, 1)' }}>GAGNANT #{index + 1}</p>
                      <p className="text-white font-mono text-sm break-all">{winner}</p>
                      {walletEmails[winner.toLowerCase()] && (
                        <p className="text-sm mt-1" style={{ color: 'rgba(225, 176, 81, 1)' }}>✉️ {walletEmails[winner.toLowerCase()]}</p>
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
          <div className="rounded-xl p-6" style={{ background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1))', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(75, 85, 99, 0.3)', backdropFilter: 'blur(8px)' }}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span style={{ color: 'rgba(156, 163, 175, 1)' }}>📜</span> Historique des tirages
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(75, 85, 99, 0.3)' }}>
                    <th className="text-left py-3 px-4 text-white text-sm">Tirage N°</th>
                    <th className="text-left py-3 px-4 text-white text-sm">Nombre de gagnants</th>
                    <th className="text-left py-3 px-4 text-white text-sm">Gagnants</th>
                  </tr>
                </thead>
                <tbody>
                  {drawHistory.map((draw, drawIndex) => (
                    <tr 
                      key={drawIndex} 
                      className="transition-colors" 
                      style={{ borderBottom: '1px solid rgba(75, 85, 99, 0.2)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(75, 85, 99, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td className="py-4 px-4">
                        <span className="text-white font-bold text-lg">#{draw.drawNumber}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white font-semibold">{draw.winners.length}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-2">
                          {draw.winners.map((winner, winnerIndex) => (
                            <div key={winnerIndex} className="rounded p-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg" style={{ color: 'rgba(209, 213, 219, 1)' }}>
                                  {winnerIndex === 0 ? '🥇' : winnerIndex === 1 ? '🥈' : winnerIndex === 2 ? '🥉' : '🏅'}
                                </span>
                                <span className="font-mono text-xs break-all" style={{ color: 'rgba(209, 213, 219, 1)' }}>{winner}</span>
                              </div>
                              {walletEmails[winner.toLowerCase()] && (
                                <span className="text-xs ml-8" style={{ color: 'rgba(225, 176, 81, 1)' }}>✉️ {walletEmails[winner.toLowerCase()]}</span>
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
