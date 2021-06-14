/// <reference types="Cypress" />

describe('E2E tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  it('should show all the initial texts and search elements', () => {
    cy.get('h1').contains('Book Search');
    cy.get('p').contains('Search for a book by title or author');
    cy.get('select').should('have.value', '');
    cy.get('select').contains('Title or author');
    cy.get('select').contains('Title');
    cy.get('select').contains('Author');
    cy.get('input').should('exist');
    cy.get('button').contains('Search');
  });

  /* it('should get dummy data', () => {
    cy.request('/').as('response');
    cy.get('@response').should((response) => {
      cy.get('a');
    });
  }); */
});
