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
import { apiPath } from "../../src/js/api/constants.js";

Cypress.Commands.add("login", () => {

    cy.visit("/", { timeout: 30000 });
    cy.get('button[data-auth="login"]').last().should('be.visible').click();
    cy.fixture("goodData.json").then((user) => {
        cy.get("input#loginEmail").should('be.visible').type(user.email);
        cy.get("input#loginPassword").should('be.visible').type(user.password);
    });
    cy.intercept("POST", `${apiPath}/social/auth/login`, {
        statusCode: 200,
        body: {
            accessToken: "dummyToken",
        },
    }).as("login");
    cy.get('button[type="submit"]').contains("Login").click();
    cy.wait("@login");
});

Cypress.Commands.add("removeToken", () => {

    cy.window().then((win) => {
        win.localStorage.removeItem("token");
    });

});