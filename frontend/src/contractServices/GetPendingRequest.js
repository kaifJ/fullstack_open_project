import { abi, contractAddresses } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'

const GetPendingRequest = (propertyId) => {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const propertyAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: getPendingRequest } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'getPendingRequest',
        params: {
            propertyid: propertyId
        }
    })

    return getPendingRequest
}

export default GetPendingRequest
