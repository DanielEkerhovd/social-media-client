import { apiPath } from "../../../src/js/api/constants.js";

describe("Login test", () => {
  it("should login the user with the login form using valid credentials", () => {
    cy.visit("/", { timeout: 30000 });
    cy.wait(2000);
    cy.get('button[data-auth="login"]').last().click();
    cy.wait(2000);
    cy.fixture("goodData.json").then((user) => {
      cy.get("input#loginEmail").type(user.email);
      cy.get("input#loginPassword").type(user.password);
    });
    cy.intercept("POST", `${apiPath}/social/auth/login`).as("login");
    cy.get('button[type="submit"]').contains('Login').click();
    cy.wait('@login').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
    });

    cy.window().its("localStorage").invoke("getItem", "token").should("exist");
  });
});
