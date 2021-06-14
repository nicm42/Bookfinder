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

  it.only('should not let you submit if option and/or input are blank', () => {
    cy.findByRole('button', { name: /search/i }).click();
    cy.get('select:invalid').then(($combobox) => {
      expect($combobox[0].validationMessage).to.eq(
        'Please select an item in the list.'
      );
    });
    cy.get('input:invalid').should('have.length', 1);
    cy.get('input:invalid').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill in this field.');
    });
  });
});
