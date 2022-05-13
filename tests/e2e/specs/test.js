import { ENDPOINTS } from "../../../src/api";

describe("App testing", () => {
  beforeEach(() => {
    cy.intercept("GET", `**/api/${ENDPOINTS.PROJECTS}`, {
      statusCode: 200,
      fixture: "projects",
    });
    cy.intercept("GET", `**/api/${ENDPOINTS.GATEWAYS}`, {
      statusCode: 200,
      fixture: "gateways",
    });
    cy.visit("/");
  });

  it("Clicks on the dropdown buttons and the labels update", () => {
    ["project", "gateway"].forEach((category, i) => {
      cy.get(`[data-test="${category}s-select"]`).as("dropdown");
      cy.get("@dropdown").contains(`All ${category}`);

      cy.get("@dropdown").click();
      cy.get(".q-menu").eq(i).as("menu");

      cy.get("@menu").find(".q-item").eq(1).click();
      cy.get("@menu").find(".q-item").eq(2).click();
      cy.get("@dropdown")
        .contains(`${category} 1`, { matchCase: false })
        .contains(`${category} 2`, { matchCase: false });
    });
  });

  it("Can select a date from a picker", () => {
    cy.get("[data-test='from-date-picker']").as("from");
    cy.get("[data-test='to-date-picker']").as("to");

    // Not testing "to" picker because Cypress seems to go crazy when 2 pickers have been opened
    cy.get("@from").click();
    cy.get(".q-date__calendar-item").eq(18).click();
    cy.get(".q-date__actions .q-btn").eq(1).click();
  });

  it("Can generate a report", () => {
    cy.intercept("POST", `**/api/${ENDPOINTS.REPORT}`, {
      statusCode: 200,
      fixture: "report",
    });
    cy.get("[data-test='report-button']").click();

    cy.get(".q-expansion-item").each((group) => {
      cy.wrap(group).find(".q-item").eq(0).as("toggle").click();
      cy.wrap(group).find(".q-table").as("table").should("be.visible");
      cy.get("@toggle").click();
      cy.get("@table").should("not.be.visible");
    });

    cy.get("[data-test='donut-chart']").should("be.visible");
  });
});
