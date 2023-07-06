/* eslint-disable no-undef */
import { ROOT_USER } from '../Constants'

describe('Dashboard', () => {
    before(() => {
        cy.setup().as('setup')
        cy.get('@setup').then(() => cy.login({ email: ROOT_USER.email, password: ROOT_USER.password }))
    })

    it('Shows dashboard', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Dashboard')
    })
})