import React from 'react'
import Register from '../Register'
import { render, screen } from '@testing-library/react'

jest.mock('../../../services/register', () => ({
    login: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}))

describe('Login component', () => {
    it('should render the component', () => {
        render(<Register />)
        expect(screen.getByRole('heading')).toHaveTextContent('Register')
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument()
    })
})
