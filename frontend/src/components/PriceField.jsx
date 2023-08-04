import { Field, useFormikContext } from 'formik'

const PriceField = ({ price, setPrice }) => {
    const formik = useFormikContext()

    const handleFormChange = (event) => {
        const { value } = event.target
        setPrice(value) // Update the local price state
        formik.setFieldValue('price', value) // Update the formik form state
    }

    return (
        <Field
            type="text"
            id="price"
            name="price"
            placeholder="Price in wei"
            onChange={handleFormChange}
            value={price}
        />
    )
}

export default PriceField