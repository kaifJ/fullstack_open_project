/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { ROOT_USER } from '../e2e/Constants'

Cypress.Commands.add('createUser', () => {
    cy.request('POST', 'http://localhost:3001/api/users', ROOT_USER)
})

Cypress.Commands.add('deleteUser', () => {
    cy.request('DELETE', `http://localhost:3001/api/users/${ROOT_USER._id}`)
})

Cypress.Commands.add('setup', () => {
    cy.deleteUser().as('deleteUser')
    cy.get('@deleteUser').then(() => cy.createUser())
})

Cypress.Commands.add('login', ({ email, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        email, password
    }).then(({ body }) => {
        localStorage.setItem('jwtToken', body.token)
    })
})