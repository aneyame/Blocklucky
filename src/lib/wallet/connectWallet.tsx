import { forwardRef, type ComponentType, useState, useEffect } from "react"
import { ethers } from "ethers"
import {
    connectedAccount,
    setConnectedAccount,
    setEthersProvider,
} from "./config"

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
                        setConnectedAccount(null)
                        setEthersProvider(null)
                        setAccount(null)
                    } else {
                        setConnectedAccount(accounts[0])
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
                const newProvider = new ethers.BrowserProvider(provider)
                setEthersProvider(newProvider)
                const accounts = await newProvider.send(
                    "eth_requestAccounts",
                    []
                )
                setConnectedAccount(accounts[0])
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
            <Component ref={ref} {...props} onClick={handleConnect}>
                {account
                    ? `${account.slice(0, 6)}...${account.slice(-4)}`
                    : props.children}
            </Component>
        )
    })
}
