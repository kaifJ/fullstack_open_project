const PropertyDetails = ({ property }) => {
    return (
        <div>
            <h1>{property.owner}</h1>
            <p>{property.price.toString()}</p>
            <p>{property.propertyId.toString()}</p>
        </div>
    )
}

export default PropertyDetails