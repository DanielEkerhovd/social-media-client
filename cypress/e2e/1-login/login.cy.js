import { apiPath } from "../../../src/js/api/constants.js";

describe("Login test", () => {
  // This tests if the login works when the user enters valid credentials and gets a 200 response

  it("should login the user with the login form using valid credentials", () => {
    cy.visit("/", { timeout: 30000 });
    cy.wait(500);
    cy.get('button[data-auth="login"]').last().click();
    cy.wait(500);
    cy.fixture("goodData.json").then((user) => {
      cy.get("input#loginEmail").type(user.email);
      cy.get("input#loginPassword").type(user.password);
    });

    cy.intercept("POST", `${apiPath}/social/auth/login`, {
      statusCode: 200,
      body : {
        accessToken: "dummyToken",
      }
    }).as("login");

    cy.get('button[type="submit"]').contains("Login").click();
    cy.wait("@login").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.window().its("localStorage").invoke("getItem", "token").then((token) => { 
        expect(token).to.exist;
    });

    //After this, the user is not authorized due to the login info being invalid, but the test is still validates the login part
  });
});
