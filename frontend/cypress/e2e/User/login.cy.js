/* eslint-disable no-undef */
describe('Login', () => {
    it('Shows login', () => {
        cy.visit('http://localhost:3000/login')
        cy.contains('Login')
    })
})