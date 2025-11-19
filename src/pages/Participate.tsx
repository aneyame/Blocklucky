import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers"
import { getConnectedAccount, getEthersProvider, CONTRACT_ADDRESS, subscribeToWalletChanges, ensureSepoliaNetwork } from "../lib/wallet"
import { supabase } from "../lib/supabase"
import LotteryABI from "../lib/LotteryABI.json"
import jsPDF from "jspdf"

export function Participate() {
  const navigate = useNavigate()
  const [account, setAccount] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [walletAssociated, setWalletAssociated] = useState<boolean | null>(null)
  const [amount, setAmount] = useState("0.00000001")
  const [ticketPrice, setTicketPrice] = useState<string>("")
  const [balance, setBalance] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAssociating, setIsAssociating] = useState(false)
  const [ticketsBought, setTicketsBought] = useState<number>(0)
  const [totalDonations, setTotalDonations] = useState<string>("0")

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

    setIsLoading(true)
    try {
      const signer = await ethersProvider.getSigner()
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        LotteryABI,
        signer
      )

      const tx = await contract.buyTicket({
        value: ethers.parseEther(amount),
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
          
          alert(`Ticket(s) acheté(s) avec succès !\n\nVos numéros de tickets: ${ticketNumbers.join(", ")}\n\nLe PDF a été ouvert dans un nouvel onglet.`)
        } else {
          alert("Ticket acheté avec succès !")
        }
      } catch (pdfError) {
        console.error("Erreur lors de la génération du PDF:", pdfError)
        alert("Ticket acheté avec succès !\n(Erreur lors de la génération du PDF)")
      }
      
      // Rafraîchir les données après l'achat
      if (account) {
        await fetchData(account)
      }
    } catch (err: any) {
      console.error(err)
      
      // Messages d'erreur personnalisés
      let errorMessage = "Erreur lors de l'achat du ticket"
      
      if (err.code === "INSUFFICIENT_FUNDS") {
        errorMessage = "Fonds insuffisants !"
      } else if (err.message?.includes("Incorrect ticket price")) {
        errorMessage = "Le montant doit être exactement 10 gwei (0.00000001 ETH)"
      } else if (err.message) {
        errorMessage = err.message
      }
      
      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Bouton retour */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 px-4 py-2 text-lime-400 border border-lime-400 rounded-lg hover:bg-lime-400/10 transition-colors"
        >
          ← Retour
        </button>

        <h1 className="text-4xl font-bold mb-8 text-lime-400">Participer à la loterie</h1>

        {/* Cas 1: Wallet non connecté */}
        {!account && (
          <div className="bg-orange-500/10 border-2 border-orange-500 rounded-lg p-8 text-center">
            <span className="text-5xl mb-4 block">⚠️</span>
            <h2 className="text-2xl font-bold text-orange-400 mb-3">Wallet non connecté</h2>
            <p className="text-gray-300 mb-6">
              Vous devez d'abord connecter votre wallet MetaMask pour participer à la loterie.
            </p>
            <p className="text-sm text-gray-400">
              Cliquez sur "Connecter mon wallet" dans la barre de navigation
            </p>
          </div>
        )}

        {/* Cas 2: Wallet connecté mais non associé */}
        {account && walletAssociated === false && (
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-2 border-purple-500 rounded-xl p-8">
            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">🔗</span>
              <h2 className="text-3xl font-bold text-lime-400 mb-2">Association de votre wallet</h2>
              <p className="text-gray-300">
                Pour participer, associez votre wallet à votre compte
              </p>
            </div>

            <div className="bg-black/40 rounded-lg p-6 mb-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-mono">{userEmail}</p>
                </div>
              </div>
              <div className="h-px bg-gray-700"></div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <p className="text-sm text-gray-400">Wallet détecté</p>
                  <p className="text-white font-mono text-sm break-all">{account}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleAssociateWallet}
              disabled={isAssociating}
              className="w-full bg-lime-400 text-black font-bold py-4 px-6 rounded-lg hover:bg-lime-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isAssociating ? "Association en cours..." : "✓ Confirmer et participer"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Cette association est permanente et ne peut pas être modifiée
            </p>
          </div>
        )}

        {/* Cas 3: Tout est OK - Page de participation normale */}
        {account && walletAssociated === true && (
          <>
            {/* Statut du wallet */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Statut du Wallet</h2>
              <div>
                <p className="text-green-400 mb-2">✓ Wallet connecté</p>
                <p className="text-gray-400 text-sm font-mono mb-2">
                  {account}
                </p>
                {balance && (
                  <p className="text-lg mt-2">
                    <span className="text-gray-400">Solde : </span>
                    <span className="text-white font-semibold">{parseFloat(balance).toFixed(6)} SepoliaETH</span>
                  </p>
                )}
              </div>
            </div>

            {/* Statistiques de participation */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-lime-900/30 to-green-900/30 border border-lime-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🎟️</span>
                  <h3 className="text-lg font-semibold text-lime-400">Tickets achetés</h3>
                </div>
                <p className="text-4xl font-bold text-white">{ticketsBought}</p>
                <p className="text-sm text-gray-400 mt-1">pour cette saison</p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">💝</span>
                  <h3 className="text-lg font-semibold text-purple-400">Dons caritatifs</h3>
                </div>
                <p className="text-4xl font-bold text-white">{parseFloat(totalDonations).toFixed(8)}</p>
                <p className="text-sm text-gray-400 mt-1">SepoliaETH donnés</p>
              </div>
            </div>

            {/* Informations de la loterie */}
            {ticketPrice && (
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Prix du ticket</h2>
                <p className="text-2xl text-lime-400">{ticketPrice} SepoliaETH</p>
                <p className="text-xl">Vous pouvez acheter jusqu'à 3 tickets</p>
              </div>
            )}

        {/* Formulaire de participation */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Montant de la participation</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">
                Montant (en SepoliaETH)
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-lime-400"
                placeholder="0.00000001"
              />
              <p className="text-gray-500 text-sm mt-2">
                Montant minimum : {ticketPrice || "0.00000001"} SepoliaETH
              </p>
            </div>
          </div>
        </div>

        {/* Bouton d'achat */}
        <button
          onClick={handleBuyTicket}
          disabled={!account || isLoading}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
            account && !isLoading
              ? "bg-lime-400 text-black hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/20"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Transaction en cours..." : "Acheter un ticket"}
        </button>

            {/* Informations complémentaires */}
            <div className="mt-8 bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Comment ça marche ?</h2>
              <ul className="space-y-2 text-gray-400">
                <li>1. Connectez votre wallet MetaMask</li>
                <li>2. Entrez le montant que vous souhaitez miser</li>
                <li>3. Confirmez la transaction dans MetaMask</li>
                <li>4. Attendez la confirmation sur la blockchain</li>
                <li>5. Votre ticket est validé !</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
