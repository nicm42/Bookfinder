/// <reference types="Cypress" />

describe('TODO add description', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  it('should work', () => {
    cy.get('h1').should('have.text', 'Book Search');
  });
});
