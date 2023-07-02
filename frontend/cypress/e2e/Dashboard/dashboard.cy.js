/* eslint-disable no-undef */
describe('Dashboard', () => {
    before(() => {
        cy.login({ email: 'root.user@gmail.com', password: 'Rootuser@123' })
    })
    it('Shows dashboard', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Dashboard')
    })
})