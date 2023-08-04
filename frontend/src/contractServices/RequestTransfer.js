import { abi, contractAddresses } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'

const RequestTransfer = (propertyId, amount) => {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const propertyAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: requestOwnershipTransfer } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'requestOwnershipTransfer',
        params: {
            propertyId
        },
        msgValue: amount
    })

    return requestOwnershipTransfer
}

export default RequestTransfer
