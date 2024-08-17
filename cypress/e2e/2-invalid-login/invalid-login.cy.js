import { apiPath } from "../../../src/js/api/constants.js";

describe("Invalid login test", () => {
  it("should not login the user with the login form using invalid credentials, and show a message", () => {
    cy.visit("/", { timeout: 30000 });
    cy.wait(500);
    cy.get('button[data-auth="login"]').last().click();
    cy.wait(500);
    cy.fixture("badData.json").then((user) => {
      cy.get("input#loginEmail").type(user.email);
      cy.get("input#loginPassword").type(user.password);
    });

    cy.intercept("POST", `${apiPath}/social/auth/login`, {
      statusCode: 401,
    }).as("login");

    cy.get('button[type="submit"]').contains("Login").click();
    cy.wait("@login").then((interception) => {
      expect(interception.response.statusCode).to.equal(401);
    });

    cy.on("window:alert", (alert) => {
      expect(alert).to.exist;
    });
  });
});
