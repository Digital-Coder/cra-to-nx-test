/* eslint-disable no-undef */
describe("When Accessing the Application", () => {
  it("is expected to have a page title set to Senf.koeln", () => {
    cy.visit("/");
    cy.title().should("include", "Senf.koeln");
  });
});
