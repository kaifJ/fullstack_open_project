/* eslint-disable no-undef */
describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })

    it('Successful login', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[placeholder="Eamil"]').type('root.user@gmail.com')
        cy.get('input[placeholder="Password"]').type('Rootuser@123')
        cy.get('button[type="submit"]').click()
        cy.contains('Dashboard')
    })

})