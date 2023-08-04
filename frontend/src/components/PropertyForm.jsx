import { useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import { AddProperty } from '../contractServices/index.js'
import PriceField from './PriceField'
import Notification from './Notificaiton'

const PropertyForm = ({ handleClose }) => {
    const [price, setPrice] = useState('')
    const addProperty = AddProperty(price)

    const { handleSuccess, handleFailure } = Notification()

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await addProperty({
                onSuccess: handleSuccess,
                onError: handleFailure,
            })
            setSubmitting(false)
        }    catch (err) {
            alert(err)
            setSubmitting(false)
        } finally {
            handleClose()
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