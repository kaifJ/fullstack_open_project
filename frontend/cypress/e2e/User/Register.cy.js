/* eslint-disable no-undef */
describe('Register', () => {
    it('shows register', () => {
        cy.visit('http://localhost:3000/register')
        cy.contains('Register')
    })
})