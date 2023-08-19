export default function (properties, sortBy) {
    if (!properties.length || sortBy === 'neutral') return properties
    return properties.sort((a, b) => {
        if (sortBy === 'ascending') {
            return a.price.toString() > b.price.toString() ? 1 : -1
        }
        else if (sortBy === 'descending')
            return a.price.toString() < b.price.toString() ? 1 : -1
    })
}