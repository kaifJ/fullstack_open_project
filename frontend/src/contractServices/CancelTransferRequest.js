import { abi, contractAddresses } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'

const CancelTransferRequest = (propertyId) => {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const propertyAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: cancelOwnershipTransfer } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'cancelOwnershipTransfer',
        params: {
            propertyId: propertyId
        }
    })

    return cancelOwnershipTransfer
}

export default CancelTransferRequest
