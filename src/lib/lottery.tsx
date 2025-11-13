import { forwardRef, type ComponentType, useState, useEffect } from "react"
import { ethers } from "ethers"

declare global {
    interface Window {
        ethereum?: any
    }
}

const contractAddress = "0x3a6ab3226C416914830F370995F805c17f260507"

const LotteryABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "player",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "drawNumber",
                type: "uint256",
            },
        ],
        name: "TicketBought",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address[]",
                name: "winners",
                type: "address[]",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "drawNumber",
                type: "uint256",
            },
        ],
        name: "WinnersPicked",
        type: "event",
    },
    {
        inputs: [],
        name: "buyTicket",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "drawNumber",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getPlayers",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "numberOfWinners",
                type: "uint256",
            },
        ],
        name: "pickWinners",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "players",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "ticketPrice",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
]

// État partagé pour stocker le wallet connecté
let connectedAccount: string | null = null
let ethersProvider: any = null

// BOUTON 1 : Connecter le wallet
export function withConnectWallet(Component: any): ComponentType<any> {
    return forwardRef((props: any, ref) => {
        const [account, setAccount] = useState<string | null>(null)

        useEffect(() => {
            // Vérifier si déjà connecté au chargement
            if (connectedAccount) {
                setAccount(connectedAccount)
            }

            // Écouter les changements de compte
            if (window.ethereum) {
                window.ethereum.on("accountsChanged", (accounts: string[]) => {
                    if (accounts.length === 0) {
                        connectedAccount = null
                        ethersProvider = null
                        setAccount(null)
                    } else {
                        connectedAccount = accounts[0]
                        setAccount(accounts[0])
                    }
                })
            }
        }, [])

        const handleConnect = async () => {
            let provider

            if (window.ethereum) {
                if (window.ethereum.providers?.length) {
                    provider = window.ethereum.providers.find(
                        (p: any) => p.isMetaMask
                    )
                    if (!provider) {
                        alert("MetaMask non détecté. Veuillez l'installer.")
                        return
                    }
                } else if (window.ethereum.isMetaMask) {
                    provider = window.ethereum
                } else {
                    alert("MetaMask non détecté. Veuillez l'installer.")
                    return
                }
            } else {
                alert("Aucun wallet détecté. Veuillez installer MetaMask.")
                return
            }

            try {
                ethersProvider = new ethers.BrowserProvider(provider)
                const accounts = await ethersProvider.send(
                    "eth_requestAccounts",
                    []
                )
                connectedAccount = accounts[0]
                setAccount(accounts[0])
                alert(
                    `Connecté : ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`
                )
            } catch (err: any) {
                console.error(err)
                alert("Erreur de connexion")
            }
        }

        return (
            <Component
                ref={ref}
                {...props}
                onClick={handleConnect}
            >
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : props.children}
            </Component>
        )
    })
}

// BOUTON 2 : Acheter un ticket
export function withBuyTicket(Component: any): ComponentType<any> {
    return forwardRef((props: any, ref) => {
        const handleClick = async () => {
            // Vérifier si wallet connecté
            if (!connectedAccount || !ethersProvider) {
                alert("Veuillez d'abord connecter votre wallet !")
                return
            }

            try {
                const signer = await ethersProvider.getSigner()
                const contract = new ethers.Contract(
                    contractAddress,
                    LotteryABI,
                    signer
                )

                const tx = await contract.buyTicket({
                    value: ethers.parseEther("0.00000001"),
                })

                alert("Transaction en cours... Veuillez patienter.")
                await tx.wait()
                alert("Ticket acheté avec succès !")
            } catch (err: any) {
                console.error(err)
                alert("Erreur lors de l'achat du ticket : " + err.message)
            }
        }

        return <Component ref={ref} {...props} onClick={handleClick} />
    })
}

// BONUS : Bouton pour lancer le tirage (admin uniquement)
export function withPickWinners(Component: any): ComponentType<any> {
    return forwardRef((props: any, ref) => {
        const handleClick = async () => {
            if (!connectedAccount || !ethersProvider) {
                alert("Veuillez d'abord connecter votre wallet !")
                return
            }

            try {
                const signer = await ethersProvider.getSigner()
                const contract = new ethers.Contract(
                    contractAddress,
                    LotteryABI,
                    signer
                )

                // Vérifier qu'on est bien le owner
                const owner = await contract.owner()
                if (connectedAccount.toLowerCase() !== owner.toLowerCase()) {
                    alert("Seul le propriétaire peut lancer le tirage !")
                    return
                }

                const numberOfWinners = 1
                const tx = await contract.pickWinners(numberOfWinners)

                alert("Tirage en cours...")
                await tx.wait()
                alert(
                    `Tirage effectué ! ${numberOfWinners} gagnant(s) sélectionné(s)`
                )
            } catch (err: any) {
                console.error(err)
                alert("Erreur lors du tirage : " + err.message)
            }
        }

        return <Component ref={ref} {...props} onClick={handleClick} />
    })
}
