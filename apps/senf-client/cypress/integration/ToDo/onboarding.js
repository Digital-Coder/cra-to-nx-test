/** @format */
// const sizes = ["iphone-6", "iphone-8", "ipad-2"];

const sizes = ["iphone-8"];

describe("Test if the Onboarding process works fine", () => {
  sizes.forEach((size) => {
    before(() => {
      Cypress.config("userAgent", "mobile_value"); // set userAgent

      cy.visit("/intro", {
        headers: {
          "user-agent":
            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        },
      });
      cy.viewport(size);
    });
    // make assertions on the logo using
    // an array of different viewports
    it("walks through the onboarding process in mobile", () => {
      // Click on
    });
  });
});
