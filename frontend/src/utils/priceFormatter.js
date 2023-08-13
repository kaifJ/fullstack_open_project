const formatPrice = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    const floatValue = parseFloat(numericValue)
    return floatValue.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    })
}

export default formatPrice
