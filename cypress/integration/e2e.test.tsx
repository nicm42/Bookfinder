/// <reference types="Cypress" />
/// <reference types="@testing-library/cypress" />

const api = 'https://www.googleapis.com/books/v1/volumes?q=';

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

  it('should not let you submit if option and/or input are blank', () => {
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

  it.only('gets one page of cards', () => {
    cy.intercept('GET', `${api}intitle:%22test%22&startIndex=0&maxResults=10`, {
      fixture: 'cards.json',
    }).as('getData');
    cy.findByTestId('select').select('intitle');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    //cy.findByTestId('loading').should('exist'); //TODO how to convince it this appears before cards are loaded
    cy.wait('@getData');
    cy.findByText('Showing books 1-4').should('exist');
    cy.findByTestId('loading').should('not.exist');
    cy.findByTestId('select').should('have.value', '');
    cy.findByRole('searchbox').should('have.value', '');
    cy.findByRole('button', { name: /previous/i }).should('not.exist');
    cy.findByRole('button', { name: /next/i }).should('not.exist');
  });
});
