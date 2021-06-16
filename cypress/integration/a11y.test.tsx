/// <reference types="Cypress" />
/// <reference types="cypress-axe" />

const apiLinkA11y = 'https://www.googleapis.com/books/v1/volumes?q=';

describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
    cy.injectAxe();
  });

  it('should be accessible on page load', () => {
    cy.checkA11y();
  });

  it('should be accessible with cards loaded', () => {
    cy.intercept(
      'GET',
      `${apiLinkA11y}intitle:%22test%22&startIndex=0&maxResults=10`,
      {
        fixture: 'manyCards1.json',
      }
    ).as('getData1');

    cy.findByTestId('select').select('intitle');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.wait('@getData1');
    cy.findByText('Showing books 1-10').should('exist');
    cy.checkA11y();
  });
});
