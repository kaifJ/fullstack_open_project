import { abi, contractAddresses } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'

const ApproveTransferRequest = (propertyId, newOwner) => {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const propertyAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: approveOwnershipTransfer } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'approveOwnershipTransfer',
        params: {
            propertyId,
            newOwner
        }
    })

    return approveOwnershipTransfer
}

export default ApproveTransferRequest
