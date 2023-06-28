/* eslint-disable no-undef */
describe('Dashboard', () => {
    it('Shows dashboard', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Dashboard')
    })
})