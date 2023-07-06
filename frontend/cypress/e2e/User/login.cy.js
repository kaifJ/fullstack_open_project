/* eslint-disable no-undef */
describe('Login', () => {
    beforeEach(() => {
        cy.setup()
        cy.visit('http://localhost:3000/login')
    })

    it('Successful login', () => {
        cy.get('input[placeholder="Email"]').type('root.user@gmail.com')
        cy.get('input[placeholder="Password"]').type('Rootuser@123')
        cy.get('button[type="submit"]').click()
        cy.contains('Dashboard')
    })

})