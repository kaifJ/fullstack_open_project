import { abi, contractAddresses } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'

const GetPropertyOwner = (propertyId) => {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const propertyAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: getPropertyOwner } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'getOwner',
        params: {
            propertyId
        }
    })

    return getPropertyOwner
}

export default GetPropertyOwner
