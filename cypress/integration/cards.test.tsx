/// <reference types="Cypress" />
/// <reference types="@testing-library/cypress" />

const apiLinkCards = 'https://www.googleapis.com/books/v1/volumes?q=';

describe('Card tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  it('gets one page of cards', () => {
    cy.intercept(
      'GET',
      `${apiLinkCards}intitle:%22test%22&startIndex=0&maxResults=10`,
      {
        fixture: 'cards.json',
      }
    ).as('getData');
    cy.findByTestId('select').select('intitle');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.wait('@getData');
    cy.findByText('Showing books 1-4').should('exist');
    cy.findByTestId('select').should('have.value', '');
    cy.findByRole('searchbox').should('have.value', '');
    cy.findByRole('button', { name: /previous/i }).should('not.exist');
    cy.findByRole('button', { name: /next/i }).should('not.exist');
  });
});
