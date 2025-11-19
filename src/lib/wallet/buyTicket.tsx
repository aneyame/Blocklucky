import { forwardRef, type ComponentType } from "react"
import { ethers } from "ethers"
import { CONTRACT_ADDRESS, getConnectedAccount, getEthersProvider } from "./config"
import LotteryABI from "../LotteryABI.json"

export function withBuyTicket(Component: any): ComponentType<any> {
    return forwardRef((props: any, ref) => {
        const handleClick = async () => {
            const connectedAccount = getConnectedAccount()
            const ethersProvider = getEthersProvider()

            // Vérifier si wallet connecté
            if (!connectedAccount || !ethersProvider) {
                alert("Veuillez d'abord connecter votre wallet !")
                return
            }

            try {
                // Vérifier le réseau
                const network = await ethersProvider.getNetwork()
                console.log("Réseau pour la transaction:", network.name, "chainId:", network.chainId.toString())
                
                if (network.chainId.toString() !== "11155111") {
                    alert("Veuillez vous connecter au réseau Sepolia (chainId: 11155111)")
                    return
                }
                
                // Vérifier que le contrat existe
                const contractCode = await ethersProvider.getCode(CONTRACT_ADDRESS)
                if (contractCode === "0x") {
                    alert("Erreur: Le contrat n'existe pas à l'adresse " + CONTRACT_ADDRESS + " sur le réseau Sepolia.")
                    return
                }
                console.log("✓ Contrat trouvé sur Sepolia")
                
                const signer = await ethersProvider.getSigner()
                const signerAddress = await signer.getAddress()
                console.log("Adresse du signer:", signerAddress)
                console.log("Adresse du contrat:", CONTRACT_ADDRESS)
                
                const contract = new ethers.Contract(
                    CONTRACT_ADDRESS,
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
                
                // Messages d'erreur plus détaillés
                if (err.code === "INSUFFICIENT_FUNDS") {
                    alert("Solde insuffisant ! Vous avez besoin de SepoliaETH pour acheter un ticket et payer les frais de gas.")
                } else {
                    alert("Erreur lors de l'achat du ticket : " + err.message)
                }
            }
        }

        return <Component ref={ref} {...props} onClick={handleClick} />
    })
}
