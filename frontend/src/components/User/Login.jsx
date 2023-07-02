import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import loginValidationSchema from './loginValidationSchema'
import loginService from '../../services/login'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const handleSubmit = (values, { setSubmitting }) => {
        loginService.login(values)
            .then(res => {
                localStorage.setItem('token', res.token)
                navigate('/')
                setSubmitting(false)
            })
            .catch(err => {
                // set email and password field as empty
                // diplay notificaiton
                // make notification component
                console.log(err)
                setSubmitting(false)
            })
    }

    const goToRegister = () => {
        navigate('/register')
    }

    return (
        <div className='login--container'>
            <h1 className='login--container__label'>Login</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <ErrorMessage className='error--message' name="email" component="div" />
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <ErrorMessage className='error--message' name="password" component="div" />
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <button className='login-button' type="submit" disabled={isSubmitting}>
                Login
                        </button>
                        <button className='register-button' onClick={goToRegister}>Register</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login