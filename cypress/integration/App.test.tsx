/// <reference types="Cypress" />

describe('TODO add description', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    cy.visit(Cypress.config('baseUrl'));
  });

  it('should work', () => {
    // eslint-disable-next-line no-undef
    cy.get('h1').should('have.text', 'Book Search');
  });
});
