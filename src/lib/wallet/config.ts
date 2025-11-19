declare global {
    interface Window {
        ethereum?: any
    }
}

export const CONTRACT_ADDRESS = "0x067d225543882Df7DeaEe1c6d213D32C3027Bc03" // l'addresse du contrat déployé sur Sepolia
export const SEPOLIA_CHAIN_ID = "0xaa36a7" // 11155111 en hexadécimal

// État partagé pour stocker le wallet connecté
export let connectedAccount: string | null = null
export let ethersProvider: any = null

// Système d'événements pour notifier les changements
type WalletListener = (account: string | null) => void
const listeners: WalletListener[] = []

export const subscribeToWalletChanges = (callback: WalletListener) => {
    listeners.push(callback)
    return () => {
        const index = listeners.indexOf(callback)
        if (index > -1) {
            listeners.splice(index, 1)
        }
    }
}

const notifyListeners = () => {
    listeners.forEach(callback => callback(connectedAccount))
}

export const setConnectedAccount = (account: string | null) => {
    connectedAccount = account
    notifyListeners()
}

export const setEthersProvider = (provider: any) => {
    ethersProvider = provider
}

export const getConnectedAccount = () => connectedAccount
export const getEthersProvider = () => ethersProvider

// Fonction pour vérifier et basculer vers le réseau Sepolia
export const ensureSepoliaNetwork = async () => {
    if (!window.ethereum) {
        throw new Error("MetaMask n'est pas installé")
    }

    try {
        // Essayer de changer vers Sepolia
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: SEPOLIA_CHAIN_ID }],
        })
    } catch (switchError: any) {
        // Si Sepolia n'est pas ajouté à MetaMask
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: SEPOLIA_CHAIN_ID,
                            chainName: 'Sepolia Test Network',
                            nativeCurrency: {
                                name: 'Sepolia ETH',
                                symbol: 'SepoliaETH',
                                decimals: 18,
                            },
                            rpcUrls: ['https://rpc.sepolia.org'],
                            blockExplorerUrls: ['https://sepolia.etherscan.io'],
                        },
                    ],
                })
            } catch (addError) {
                throw new Error("Impossible d'ajouter le réseau Sepolia")
            }
        } else {
            throw switchError
        }
    }
}
