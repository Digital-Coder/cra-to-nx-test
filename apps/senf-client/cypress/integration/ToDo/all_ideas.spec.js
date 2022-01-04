/** @format */
const fakeData = require("../../fixtures/screams_all_ideas.json");

describe("Some Test", () => {
  it("Adds document to test_hello_world collection of Firestore", () => {
    // cy.callFirestore("set", "screams", fakeData);
    cy.callFirestore("get", "screams").then((scream) => {
      cy.log("get returned: ", scream);
    });
  });
});

describe("Test the display of ideas within the mainpage", () => {
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    // cy.intercept("GET", "**/api/screams", {
    //   fixture: "screams_all_ideas.json",
    // });
    // cy.intercept(
    //   "GET",
    //   "https://google.firestore.v1.Firestore/Listen/channel?database=projects/senf-dev/databases/(default)&gsessionid=SKrYZRftz1inmHCpQzL2UYabw7hgmsYjr98BJcYvDxA&VER=8&RID=rpc&SID=vYNi01z4ljnz2_eLg0URHw&CI=0&AID=0&TYPE=xmlhttp&zx=z171l41j0dja&t=1"
    // );
    cy.intercept("GET", "**/api/sockjs-node/info?t=1631367554782");

    cy.visit("/");
  });

  it("inspecting if ideas on the mainpage are displayed correctly", () => {
    //Check if ideas within the main page are loading correctly
    //cy.
    //Check if the sorting is working
    //cy.

    //Check if the topic-filters are workin
    cy.wait(1000);

    cy.get(".sideBar").within(() => {
      cy.get("[data-cy=topic-all]").click({ force: true }); // or otherwise scroll up again
    });
    //check if the data is same

    cy.get(".sideBar").within(() => {
      cy.get("[data-cy=Versorgung]").click({ force: true }); // or otherwise scroll up again
    });

    //ALL RESULTS SHALL CONTAIN Versorgung

    cy.get(".sideBar").within(() => {
      cy.get("[data-cy=Verkehr]").click({ force: true }); // or otherwise scroll up again
    });
    //ALL RESULTS SHALL CONTAIN Traffic

    cy.get(".sideBar").within(() => {
      cy.get("[data-cy='Umwelt und Grün']").click({ force: true }); // or otherwise scroll up again
    });
    //ALL RESULTS SHALL CONTAIN Umwelt und Grün

    cy.get(".sideBar").within(() => {
      cy.get("[data-cy=Rad]").click({ force: true }); // or otherwise scroll up again
    });
    //ALL RESULTS SHALL CONTAIN Rad

    cy.get(".sideBar").within(() => {
      cy.get("[data-cy='Inklusion / Soziales']").click({ force: true }); // or otherwise scroll up again
    });
    //ALL RESULTS SHALL CONTAIN Inklusion / Soziales

    cy.get(".sideBar").within(() => {
      cy.get("[data-cy='Sport / Freizeit']").click({ force: true }); // or otherwise scroll up again
    });
    //ALL RESULTS SHALL CONTAIN Inklusion / Soziales

    cy.get(".sideBar").within(() => {
      cy.get("[data-cy=Sonstige]").click({ force: true }); // or otherwise scroll up again
    });
    //ALL RESULTS SHALL CONTAIN Sonstige

    //Check if the map-filter is working
    //cy.
    //Check if the revert map-filter is working
    //cy.
    //Check if you can inspect a certain idea from the list
    //cy.
    //close idea
    //cy.
    //Check if you can inspect a certain idea from the map
    //cy.
    //close idea
    //cy.
    //Check if you can inspect a certain idea from the map
    //cy.
    //close idea
    //cy.
    //Check if there are ideas without a location (black dot on the map with number in it)
    //cy.
    //Check if you can click it and then click on the button "(Number) show ideas"
    //cy.
    //Check if the filtering in the list is working correctly
    //cy.
  });
});
