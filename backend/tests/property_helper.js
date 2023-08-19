const validProperty = {
    title: 'A valid property',
    description: 'A valid description',
    address: 'A valid address',
    propertyId: '1',
    isPropertyForSale: true,
}

const incompleteProperty = {
    title: '',
    description: 'A valid description',
    address: '',
    propertyId: '1',
    isPropertyForSale: true,
}

module.exports = { validProperty, incompleteProperty }