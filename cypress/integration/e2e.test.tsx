/// <reference types="Cypress" />
/// <reference types="@testing-library/cypress" />

describe('E2E tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  it('should show all the initial texts and search elements', () => {
    cy.findAllByText('Book Search').should(
      'exist'
    ); /* I didn't think this text was on there more than once, but apparently it is */
    cy.findByText('Search for a book by title or author').should('exist');
    cy.findByTestId('select').should('have.value', '');
    cy.findByRole('combobox', { name: /title or author/i }).should('exist');
    cy.findByRole('option', { name: /title/i }).should('exist');
    cy.findByRole('option', { name: /author/i }).should('exist');
    cy.findByRole('searchbox').should('exist');
    cy.findByRole('button', { name: /search/i }).should('exist');
  });
});
