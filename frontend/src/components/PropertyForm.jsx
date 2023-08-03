import { Formik, Field, Form, ErrorMessage } from 'formik'
import { contractAddresses, abi } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'

const PropertyForm = () => {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const propertyAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: addProperty } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'addProperty',
        params: {
            price: 1000000,
        },
    })


    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const result = await addProperty()
            alert(JSON.stringify(result))
            setSubmitting(false)
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
                        <Field
                            type="text"
                            id="price"
                            name="price"
                            placeholder="Price in wei"
                        />
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