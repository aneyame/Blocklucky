import { forwardRef, type ComponentType } from "react"
import { ethers } from "ethers"
import { CONTRACT_ADDRESS, getConnectedAccount, getEthersProvider } from "./config"
import LotteryABI from "../LotteryABI.json"

export function withPickWinners(Component: any): ComponentType<any> {
    return forwardRef((props: any, ref) => {
        const handleClick = async () => {
            const connectedAccount = getConnectedAccount()
            const ethersProvider = getEthersProvider()

            if (!connectedAccount || !ethersProvider) {
                alert("Veuillez d'abord connecter votre wallet !")
                return
            }

            try {
                const signer = await ethersProvider.getSigner()
                const contract = new ethers.Contract(
                    CONTRACT_ADDRESS,
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
