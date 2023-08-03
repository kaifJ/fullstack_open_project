import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import AddProperty from '../contractServices/AddProperty'
import PriceField from './PriceField'

const PropertyForm = ({ handleClose }) => {
    const [price, setPrice] = useState('')
    const addProperty = AddProperty(price)

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const result = await addProperty()
            alert(JSON.stringify(result))
            setSubmitting(false)
            handleClose()
        }    catch (err) {
            alert(err)
            setSubmitting(false)
        }
    }

    return <div>
        <h1>Property Form</h1>
        <Formik
            initialValues={{ price: '' }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <ErrorMessage className='error--message' name="price" component="div"/>
                        <PriceField price={price} setPrice={setPrice} />
                    </div>
                    <button className='login-button' type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}

export default PropertyForm