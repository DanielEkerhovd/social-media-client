import { apiPath } from "../../../src/js/api/constants.js";

describe("Login test", () => {
  // This tests if the login works when the user enters valid credentials and gets a 200 response

  it("should login the user with the login form using valid credentials", () => {
    // Makes the test start with a clean slate
    cy.removeToken();

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
      body: {
        accessToken: "dummyToken",
      },
    }).as("login");

    cy.get('button[type="submit"]').contains("Login").click();
    cy.wait("@login").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    // Checks if the token is stored in the local storage
    cy.window().then((win) => {
      cy.wrap(null).should(() => {
        const token = win.localStorage.getItem("token");
        expect(token).to.exist;
        expect(JSON.parse(token)).to.equal("dummyToken");
      });
    });

    //After the test, the user is not authorized due to the login info being invalid, but the test still validates the login part
  });
});
