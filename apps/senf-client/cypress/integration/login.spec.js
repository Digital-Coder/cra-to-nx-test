/** @format */

const authUser = require("../fixtures/auth-user.json");

describe("The Login Page", () => {
  const { email, password, handle } = authUser;
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    cy.intercept("POST", "**/api/login", { fixture: "auth-resp-token.json" });
    cy.intercept("GET", "**/api/user", { fixture: "auth-resp-user.json" });
    // intercept because:
    // 1) tests should not be dependent on API being available
    // 2) makes it more predictable (rather than depending on user being there)
    // 3) gives flexibility to test different case (e.g. simulate network error)
    // Note: can put the "intercepts" into the commands.js file if need it throughout other tests
    cy.visit("/");
  });

  // data-cy tags were added to the html as necessary
  it("logs User in successfully", () => {
    cy.get(".sideBar").within(() => {
      cy.get("[data-cy=open-RegistrationAndLogin]").click({ force: true }); // or otherwise scroll up again
    });
    cy.wait(5000);
    // **TO DO**: improve - do we need the spinner?
    // cy.waitUntil(() => cy.get("spinnerDivBackground").should("not.exist"))
    // click on login / anmelden
    cy.get("[data-cy=login]").click({ force: true });
    // fill email and password
    cy.get("[data-cy=login-email]").click().type(email);
    cy.get("[data-cy=login-password]").click().type(password);
    // submit button
    cy.get("[data-cy=login-user]").click();
    // click the Profile button in Sidebar
    cy.get(".sideBar").find("[data-cy=profile-button]").click({ force: true });
    cy.get("[data-cy=hey-user]").should("contain.text", "Hey " + handle);
  });
});
