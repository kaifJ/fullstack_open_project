/* eslint-disable no-undef */
describe('Register', () => {
    before(() => {
        cy.visit('http://localhost:3000')
        cy.contains('Register').click()
    })
    it('shows register', () => {
        cy.contains('Register')
    })
})