import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers"
import { getConnectedAccount, getEthersProvider, CONTRACT_ADDRESS, subscribeToWalletChanges, ensureSepoliaNetwork } from "../lib/wallet"
import { supabase } from "../lib/supabase"
import LotteryABI from "../lib/LotteryABI.json"
import jsPDF from "jspdf"
import { Wallet, Heart, Trophy, Shield, ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";



export function Participate() {
  const navigate = useNavigate()
  const [account, setAccount] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [walletAssociated, setWalletAssociated] = useState<boolean | null>(null)
  const [ticketPrice, setTicketPrice] = useState<string>("")
  const [balance, setBalance] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAssociating, setIsAssociating] = useState(false)
  const [ticketsBought, setTicketsBought] = useState<number>(0)
  const [totalDonations, setTotalDonations] = useState<string>("0")

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const predefinedAmounts = [5, 10, 25, 50, 100, 200];


  // Fonction pour générer le PDF des tickets
  const generateTicketPDF = (ticketNumbers: number[], email: string, wallet: string, purchaseDate: string) => {
    const doc = new jsPDF()
    
    // En-tête
    doc.setFontSize(20)
    doc.text("BlockLucky - Ticket de Loterie", 105, 20, { align: "center" })
    
    doc.setFontSize(10)
    doc.text("_________________________________________________", 105, 25, { align: "center" })
    
    // Informations de l'utilisateur
    doc.setFontSize(12)
    doc.text("Informations de l'acheteur", 20, 40)
    
    doc.setFontSize(10)
    doc.text(`Email: ${email}`, 20, 50)
    doc.text(`Wallet: ${wallet}`, 20, 58)
    doc.text(`Date d'achat: ${purchaseDate}`, 20, 66)
    
    // Ligne de séparation
    doc.setFontSize(10)
    doc.text("_________________________________________________", 105, 75, { align: "center" })
    
    // Liste des tickets
    doc.setFontSize(14)
    doc.text("Vos tickets:", 20, 90)
    
    doc.setFontSize(12)
    let yPosition = 100
    ticketNumbers.forEach((ticketNum) => {
      doc.text(`Ticket #${ticketNum}`, 30, yPosition)
      yPosition += 10
    })
    
    // Pied de page
    doc.setFontSize(8)
    doc.text("Conservez ce document comme preuve d'achat.", 105, 280, { align: "center" })
    doc.text("Bonne chance !", 105, 285, { align: "center" })
    
    // Ouvrir le PDF dans un nouvel onglet
    const pdfBlob = doc.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, '_blank')
  }

  // Récupérer le solde et le prix du ticket
  const fetchData = async (accountAddress: string) => {
    const provider = getEthersProvider()
    if (provider && accountAddress) {
      try {
        // S'assurer qu'on est sur le réseau Sepolia
        await ensureSepoliaNetwork()
        
        // Vérifier le réseau actuel
        const network = await provider.getNetwork()
        console.log("Réseau actuel:", network.name, "chainId:", network.chainId.toString())
        
        // Récupérer le solde
        const balanceWei = await provider.getBalance(accountAddress)
        setBalance(ethers.formatEther(balanceWei))
        console.log("Solde:", ethers.formatEther(balanceWei), "SepoliaETH")

        // Vérifier que le contrat existe
        const contractCode = await provider.getCode(CONTRACT_ADDRESS)
        console.log("Code du contrat (longueur):", contractCode.length)
        if (contractCode === "0x") {
          console.error("⚠️ ERREUR: Le contrat n'existe pas à cette adresse sur ce réseau!")
          alert("Erreur: Le contrat n'existe pas sur le réseau Sepolia. Vérifiez l'adresse du contrat.")
          return
        }

        // Récupérer le prix du ticket
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          LotteryABI,
          provider
        )
        const price = await contract.ticketPrice()
        setTicketPrice(ethers.formatEther(price))
        console.log("Prix du ticket:", ethers.formatEther(price), "SepoliaETH")

        // Récupérer le nombre de tickets achetés par l'utilisateur
        try {
          const ticketCount = await contract.getTicketCount(accountAddress)
          setTicketsBought(Number(ticketCount))
          console.log("Tickets achetés:", Number(ticketCount))
        } catch (err) {
          console.log("Impossible de récupérer le nombre de tickets:", err)
        }

        // Écouter les événements de dons pour cet utilisateur
        try {
          const filter = contract.filters.DonationSent(accountAddress)
          const events = await contract.queryFilter(filter)
          
          let totalDonated = BigInt(0)
          events.forEach((event) => {
            if ('args' in event) {
              totalDonated += event.args.amount as bigint
            }
          })
          setTotalDonations(ethers.formatEther(totalDonated))
          console.log("Total des dons:", ethers.formatEther(totalDonated), "SepoliaETH")
        } catch (err) {
          console.log("Impossible de récupérer les dons:", err)
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err)
      }
    }
  }

  // Gérer la connexion wallet et l'association
  useEffect(() => {
    const connectedAccount = getConnectedAccount()
    setAccount(connectedAccount)

    // Récupérer l'utilisateur connecté
    const checkUserAndWallet = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUserEmail(session.user.email || null)
        
        // Vérifier si le wallet est déjà associé
        if (connectedAccount) {
          const { data: walletData } = await supabase
            .from('user_wallets')
            .select('*')
            .eq('user_id', session.user.id)
            .single()
          
          if (walletData?.wallet_address) {
            // Wallet déjà associé
            setWalletAssociated(true)
            fetchData(connectedAccount)
          } else {
            // Wallet non associé
            setWalletAssociated(false)
          }
        }
      }
    }

    checkUserAndWallet()

    if (connectedAccount) {
      fetchData(connectedAccount)
    }

    // S'abonner aux changements de wallet
    const unsubscribe = subscribeToWalletChanges((newAccount) => {
      setAccount(newAccount)
      if (newAccount) {
        fetchData(newAccount)
        checkUserAndWallet()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleAssociateWallet = async () => {
    if (!account) {
      alert("Aucun wallet détecté")
      return
    }

    setIsAssociating(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        alert("Vous devez être connecté")
        return
      }

      // Insérer l'association dans la table user_wallets
      const { error } = await supabase
        .from('user_wallets')
        .insert({
          user_id: session.user.id,
          email: session.user.email,
          wallet_address: account.toLowerCase()
        })

      if (error) {
        if (error.code === '23505') {
          alert("Ce wallet est déjà associé à un compte")
        } else {
          throw error
        }
        return
      }

      setWalletAssociated(true)
      alert("Wallet associé avec succès ! 🎉")
    } catch (err: any) {
      console.error("Erreur lors de l'association:", err)
      alert("Erreur: " + err.message)
    } finally {
      setIsAssociating(false)
    }
  }

  const handleBuyTicket = async () => {
    const connectedAccount = getConnectedAccount()
    const ethersProvider = getEthersProvider()

    if (!connectedAccount || !ethersProvider) {
      alert("Veuillez d'abord connecter votre wallet !")
      navigate("/")
      return
    }

    // Convertir le montant en € vers SepoliaETH (5€ = 0.00000001 ETH)
    const euroAmount = selectedAmount || parseFloat(customAmount)
    if (!euroAmount || euroAmount <= 0) {
      alert("Veuillez sélectionner un montant valide")
      return
    }
    
    // Conversion : 5€ = 0.00000001 ETH, donc 1€ = 0.000000002 ETH
    const ethAmount = (euroAmount / 5) * 0.00000001
    const ethAmountString = ethAmount.toFixed(18) // Précision maximale

    // Calculer le nombre de tickets demandés
    const requestedTickets = Math.floor(euroAmount / 5)
    const maxTickets = 3
    const ticketsYouWillGet = Math.min(requestedTickets, maxTickets - ticketsBought)
    
    if (ticketsYouWillGet <= 0) {
      alert(`Vous avez déjà atteint le maximum de ${maxTickets} tickets pour cette saison.`)
      return
    }
    
    // Avertir l'utilisateur du nombre de tickets qu'il va recevoir
    const confirmMessage = `Vous allez recevoir ${ticketsYouWillGet} ticket(s) pour ${euroAmount}€.\n` +
      `Tickets actuels: ${ticketsBought}/${maxTickets}\n` +
      `Tickets après achat: ${ticketsBought + ticketsYouWillGet}/${maxTickets}\n\n` +
      `Voulez-vous continuer ?`
    
    if (!confirm(confirmMessage)) {
      return
    }

    setIsLoading(true)
    try {
      const signer = await ethersProvider.getSigner()
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        LotteryABI,
        signer
      )

      const tx = await contract.buyTicket({
        value: ethers.parseEther(ethAmountString),
      })

      alert("Transaction en cours... Veuillez patienter.")
      const receipt = await tx.wait()
      
      // Récupérer les numéros de tickets depuis l'événement
      try {
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          LotteryABI,
          ethersProvider
        )
        
        // Chercher l'événement TicketBought dans le receipt
        const ticketBoughtEvent = receipt.logs
          .map((log: any) => {
            try {
              return contract.interface.parseLog(log)
            } catch {
              return null
            }
          })
          .find((event: any) => event && event.name === "TicketBought")
        
        if (ticketBoughtEvent && ticketBoughtEvent.args.ticketNumbers) {
          const ticketNumbers = ticketBoughtEvent.args.ticketNumbers.map((n: bigint) => Number(n))
          const purchaseDate = new Date().toLocaleString('fr-FR')
          
          // Récupérer l'email de l'utilisateur
          const { data: { session } } = await supabase.auth.getSession()
          const email = session?.user?.email || "Email non disponible"
          
          // Générer le PDF
          generateTicketPDF(ticketNumbers, email, account!, purchaseDate)
          
          alert(`Don de ${euroAmount}€ effectué avec succès !\n\nVos numéros de tickets: ${ticketNumbers.join(", ")}\n\nLe PDF a été ouvert dans un nouvel onglet.`)
        } else {
          alert(`Don de ${euroAmount}€ effectué avec succès !`)
        }
        
        // Réinitialiser le formulaire
        setSelectedAmount(null)
        setCustomAmount("")
      } catch (pdfError) {
        console.error("Erreur lors de la génération du PDF:", pdfError)
        alert(`Don de ${euroAmount}€ effectué avec succès !\n(Erreur lors de la génération du PDF)`)
      }
      
      // Rafraîchir les données après l'achat
      if (account) {
        await fetchData(account)
      }
    } catch (err: any) {
      console.error(err)
      
      // Messages d'erreur personnalisés
      let errorMessage = "Erreur lors du don"
      
      if (err.code === "INSUFFICIENT_FUNDS") {
        errorMessage = "Fonds insuffisants dans votre wallet !"
      } else if (err.message?.includes("user rejected")) {
        errorMessage = "Transaction annulée"
      } else if (err.message) {
        errorMessage = err.message
      }
      
      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-12">
      {/* Spacer Section */}
      <div className="bg-black" style={{ height: '150px' }}></div>
      
      {/* Cas 1: Wallet non connecté */}
      {!account && (
        <div className="max-w-2xl mx-auto px-6">
          <div className="rounded-2xl p-8 text-center" style={{
            background: 'linear-gradient(to bottom right, rgba(251, 146, 60, 0.1), rgba(234, 88, 12, 0.1))',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'rgba(249, 115, 22, 1)'
          }}>
            <span className="text-6xl mb-4 block">⚠️</span>
            <h2 className="text-3xl font-bold mb-3" style={{ color: 'rgba(251, 146, 60, 1)' }}>Wallet non connecté</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Vous devez d'abord connecter votre wallet MetaMask pour faire un don et participer à la loterie.
            </p>
            <p className="text-sm text-gray-400">
              Cliquez sur "Connecter mon wallet" dans la barre de navigation en haut de la page
            </p>
          </div>
        </div>
      )}

      {/* Cas 2: Wallet connecté mais non associé */}
      {account && walletAssociated === false && (
        <div className="max-w-2xl mx-auto px-6">
          <div className="rounded-2xl p-8" style={{
            background: 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.2), rgba(124, 58, 237, 0.2))',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'rgba(168, 85, 247, 1)'
          }}>
            <div className="text-center mb-6">
              <span className="text-6xl mb-4 block">🔗</span>
              <h2 className="text-3xl font-bold mb-2" style={{ color: 'rgba(225, 176, 81, 1)' }}>Association de votre wallet</h2>
              <p className="text-gray-300">
                Pour participer, associez votre wallet à votre compte
              </p>
            </div>

            <div className="rounded-lg p-6 mb-6 space-y-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">✉️</span>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-mono">{userEmail}</p>
                </div>
              </div>
              <div style={{ height: '1px', backgroundColor: 'rgba(55, 65, 81, 1)' }}></div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">💼</span>
                <div>
                  <p className="text-sm text-gray-400">Wallet détecté</p>
                  <p className="text-white font-mono text-sm break-all">{account}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleAssociateWallet}
              disabled={isAssociating}
              className="w-full font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              style={{
                background: isAssociating ? 'rgba(132, 204, 22, 0.7)' : 'rgba(132, 204, 22, 1)',
                color: 'rgba(0, 0, 0, 1)'
              }}
              onMouseEnter={(e) => !isAssociating && (e.currentTarget.style.background = 'rgba(163, 230, 53, 1)')}
              onMouseLeave={(e) => !isAssociating && (e.currentTarget.style.background = 'rgba(132, 204, 22, 1)')}
            >
              {isAssociating ? "Association en cours..." : "✓ Confirmer et participer"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Cette association est permanente et ne peut pas être modifiée
            </p>
          </div>
        </div>
      )}

      {/* Cas 3: Tout est OK - Formulaire de don */}
      {account && walletAssociated === true && (
        <>
          {/* Hero Section */}
          <div className="relative pb-20 px-6 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(225, 176, 81, 0.1)' }} />
              <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(138, 28, 38, 0.1)' }} />
            </div>

            <div className="max-w-6xl mx-auto relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h1 className="text-5xl md:text-6xl mb-6 drop-shadow-[0_0_30px_rgba(225,176,81,0.5)] text-[48px]">
                  Faire un don
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto text-[16px] mb-8">
                  Soutenir une cause caritative et participer à une loterie, c'est gagner à tous les niveaux
                </p>
              </motion.div>

              {/* Impact Stats */}
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 0.1), rgba(193, 143, 40, 0.1))',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(225, 176, 81, 0.3)'
                  }}
                >
                  <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgba(225, 176, 81, 1)' }} />
                  <div className="text-3xl mb-2">100%</div>
                  <div className="text-gray-400">Pour la charité</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(110, 14, 26, 0.1), rgba(138, 28, 38, 0.1))',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(138, 28, 38, 0.3)'
                  }}
                >
                  <Trophy className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgba(138, 28, 38, 1)' }} />
                  <div className="text-3xl mb-2">3 400</div>
                  <div className="text-gray-400">Lots à gagner au total</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(225, 176, 81, 0.1), rgba(193, 143, 40, 0.1))',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(225, 176, 81, 0.3)'
                  }}
                >
                  <Shield className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgba(225, 176, 81, 1)' }} />
                  <div className="text-3xl mb-2">100%</div>
                  <div className="text-gray-400">Transparent & Sécurisé</div>
                </motion.div>
              </div>

              {/* Donation Form */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-gradient-to-br from-gray-900/80 to-black rounded-2xl p-8 backdrop-blur-sm" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.2)' }}>
                  <h2 className="text-2xl mb-6 text-center">Choisissez votre montant</h2>

                  <div>

                  </div>
                  
                  {/* Ticket Allocation Info */}
                  <div className="mb-6 p-4 rounded-xl" style={{
                    backgroundColor: 'rgba(225, 176, 81, 0.1)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(225, 176, 81, 0.3)'
                  }}>
                    <h3 className="text-sm mb-3 flex items-center gap-2" style={{ color: 'rgba(225, 176, 81, 1)' }}>
                      <Sparkles className="w-4 h-4" />
                      Comment fonctionne l'attribution des tickets ?
                    </h3>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <span style={{ color: 'rgba(225, 176, 81, 1)' }}>•</span>
                        <span><strong>Prix par ticket :</strong> 5€ = 1 ticket</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span style={{ color: 'rgba(225, 176, 81, 1)' }}>•</span>
                        <span><strong>Maximum :</strong> 3 tickets par personne</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span style={{ color: 'rgba(225, 176, 81, 1)' }}>•</span>
                        <span><strong>Exemples :</strong> 10€ = 2 tickets | 13€ = 2 tickets | 25€ = 3 tickets | 200€ = 3 tickets</span>
                      </li>
                    </ul>
                    <p className="text-xs text-gray-400 mt-3">
                      Note : Les montants non-multiples de 5 sont arrondis vers le bas, avec un maximum de 3 tickets.
                    </p>
                  </div>
                  
                  {/* Predefined Amounts */}
                  <div className="grid grid-cols-2 md:grid-cols-3 mb-6" style={{ gap: '1rem' }}>
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        disabled={isLoading}
                        className="relative p-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          borderWidth: '2px',
                          borderStyle: 'solid',
                          borderColor: selectedAmount === amount ? 'rgba(225, 176, 81, 1)' : 'rgba(75, 85, 99, 1)',
                          backgroundColor: selectedAmount === amount ? 'rgba(225, 176, 81, 0.1)' : 'rgba(31, 41, 55, 0.5)'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedAmount !== amount && !isLoading) {
                            e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.5)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedAmount !== amount) {
                            e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 1)';
                          }
                        }}
                      >
                        <div className="text-2xl">{amount}€</div>
                        {selectedAmount === amount && (
                          <Check className="absolute top-1/2 left-3 -translate-y-1/2 w-6 h-6" style={{ color: 'rgba(225, 176, 81, 1)' }} />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-8">
                    <label className="block text-sm text-gray-400 mb-2 p-2 rounded " style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(55, 65, 81, 1)' }}>
                      Ou entrez un montant personnalisé
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || parseFloat(value) >= 0) {
                            setCustomAmount(value);
                            setSelectedAmount(null);
                          }
                        }}
                        disabled={isLoading}
                        placeholder="Montant personnalisé"
                        min="0.50"
                        step="0.1"
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-colors h-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: 'rgba(31, 41, 55, 0.5)',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: 'rgba(55, 65, 81, 1)',
                          marginTop: '0.5rem',
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 1)'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 1)'}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                    </div>
                  </div>

                  {/* Donation Benefits */}
                  <div className="bg-gradient-to-br from-green-400/20 to-black rounded-xl p-6 mb-6" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.2)' }}>
                    <h3 className="text-lg mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" style={{ color: 'rgba(225, 176, 81, 1)' }} />
                      Ce que vous obtenez
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                        <span className="text-gray-300">Participation automatique à la loterie</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                        <span className="text-gray-300">100% de votre don va directement à une association caritative partenaire de l'évènement</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                        <span className="text-gray-300">Reçu fiscal pour votre don (déduction d'impôts)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                        <span className="text-gray-300">Transaction 100% sécurisée sur la blockchain</span>
                      </li>
                    </ul>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <h3 className="text-sm text-gray-400 mb-4">Méthodes de paiement acceptées</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        className="flex items-center gap-3 p-4 rounded-xl transition-colors"
                        style={{
                          backgroundColor: 'rgba(31, 41, 55, 0.5)',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: 'rgba(55, 65, 81, 1)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(225, 176, 81, 0.5)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 1)'}
                      >
                        <Wallet className="w-6 h-6" style={{ color: 'rgba(225, 176, 81, 1)' }} />
                        <div className="text-left">
                          <div className="text-sm">Crypto Wallet</div>
                          <div className="text-xs text-gray-500">ETH uniquement</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={handleBuyTicket}
                    disabled={(!selectedAmount && !customAmount) || isLoading}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 brightness-110 transition-all duration-300 text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(to right, rgba(193, 143, 40, 1), rgba(225, 176, 81, 1), rgba(193, 143, 40, 1))'
                    }}
                    onMouseEnter={(e) => {
                      if ((selectedAmount || customAmount) && !isLoading) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <span className="text-lg">
                      {isLoading ? "Transaction en cours..." : `Faire un don ${(selectedAmount || customAmount) ? `de ${selectedAmount || customAmount}€` : ''}`}
                    </span>
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    En cliquant sur "Faire un don", vous acceptez nos conditions générales et notre politique de confidentialité.
                  </p>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-16 text-center mb-8"
              >
                <div className="flex flex-wrap justify-center gap-8 items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Shield className="w-5 h-5" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                    <span className="text-sm">Paiement sécurisé SSL</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Check className="w-5 h-5" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                    <span className="text-sm">100% Transparent</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Heart className="w-5 h-5" style={{ color: 'rgba(3, 189, 108, 1)' }} />
                    <span className="text-sm">100% reversé à la charité</span>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Mini Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-20 max-w-4xl mx-auto"
              >
                <h2 className="text-3xl mb-8 text-center pt-16">Questions fréquentes</h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-gray-900/80 to-black rounded-xl p-6" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.2)' }}>
                    <h3 className="text-lg mb-2" style={{ color: 'rgba(225, 176, 81, 1)' }}>Puis-je faire un don sans participer à la loterie ?</h3>
                    <p className="text-gray-400">
                      Non, chaque don vous inscrit automatiquement à la loterie. C'est notre façon de vous remercier pour votre générosité !
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-900/80 to-black rounded-xl p-6" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.2)' }}>
                    <h3 className="text-lg mb-2" style={{ color: 'rgba(225, 176, 81, 1)' }}>Comment sont utilisés les fonds ?</h3>
                    <p className="text-gray-400">
                      100% des dons vont directement aux associations caritatives ! Pas de frais cachés.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-900/80 to-black rounded-xl p-6" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(225, 176, 81, 0.2)' }}>
                    <h3 className="text-lg mb-2" style={{ color: 'rgba(225, 176, 81, 1)' }}>Est-ce que mon don est déductible des impôts ?</h3>
                    <p className="text-gray-400">
                      Oui ! Vous recevrez un reçu fiscal vous permettant de déduire 66% de votre don de vos impôts.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
