import React from 'react'
import Login from '../Login'
import { render, screen } from '@testing-library/react'

describe('Simple render test', () => {
    it('should render the component', () => {
        render(<Login />)
        expect(screen.getByText('Login')).toBeInTheDocument()
    })
})