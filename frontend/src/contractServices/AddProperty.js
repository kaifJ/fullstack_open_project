import { abi, contractAddresses } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'

const AddProperty = (price) => {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const propertyAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: addProperty } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'addProperty',
        params: {
            price
        }
    })

    return addProperty
}

export default AddProperty
