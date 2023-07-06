/* eslint-disable no-undef */
import { ROOT_USER } from '../Constants'
describe('Register', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.contains('Register').click()
    })

    it('Successful registration', () => {
        cy.get('input[placeholder="Username"]').type(ROOT_USER.username)
        cy.get('input[placeholder="Name"]').type(ROOT_USER.name)
        cy.get('input[placeholder="Email"]').type(ROOT_USER.email)
        cy.get('input[placeholder="Password"]').type(ROOT_USER.password)
        cy.get('input[placeholder="Confirm Password"]').type(ROOT_USER.password)
        cy.get('button[type="submit"]').click()
        cy.contains('Login')
    })

    it('Unsuccessful registration', () => {
        cy.get('input[placeholder="Username"]').type(ROOT_USER.username)
        cy.get('input[placeholder="Name"]').type(ROOT_USER.name)
        cy.get('input[placeholder="Email"]').type(ROOT_USER.email)
        cy.get('input[placeholder="Password"]').type(ROOT_USER.password)
        cy.get('input[placeholder="Confirm Password"]').type(ROOT_USER.password)
        cy.get('button[type="submit"]').click()
        cy.contains('Username already exists')
    })
})