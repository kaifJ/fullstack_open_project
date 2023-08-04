import { useMoralis } from 'react-moralis'
import { useEffect, useState } from 'react'
import PropertyDetails from './PropertyDetails'
import { GetAllProperties } from '../contractServices/index.js'

export default function LotteryEntrance() {
    const { isWeb3Enabled } = useMoralis()

    const [properties, setProperties] = useState([])

    const getAllProperties = GetAllProperties()

    async function updateUIValues() {
        const properties = await getAllProperties()
        setProperties(properties)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            {properties.map((property) => (
                <PropertyDetails
                    key={`${property.propertyId.toString()}~${property.price.toString()}`}
                    property={property}
                />
            ))}
        </div>
    )
}
