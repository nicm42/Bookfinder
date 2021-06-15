/// <reference types="Cypress" />
/// <reference types="@testing-library/cypress" />

const api = 'https://www.googleapis.com/books/v1/volumes?q=';

describe('API tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  it('successfully gets data from API using title', () => {
    cy.intercept(
      'GET',
      `${api}intitle:%22test%22&startIndex=0&maxResults=10`
    ).as('getData');
    cy.findByTestId('select').select('intitle');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.wait('@getData').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
  });

  it('successfully gets data from API using author', () => {
    cy.intercept(
      'GET',
      `${api}inauthor:%22test%22&startIndex=0&maxResults=10`
    ).as('getData');
    cy.findByTestId('select').select('inauthor');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.wait('@getData').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
  });

  it('tests for no data from API using title', () => {
    cy.intercept('GET', `${api}intitle:%22test%22&startIndex=0&maxResults=10`, {
      fixture: 'nocards.json',
    }).as('getData');
    cy.findByTestId('select').select('intitle');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.wait('@getData');
    cy.findByText('No books were found with the title test :(').should('exist');
  });

  it('tests for no data from API using author', () => {
    cy.intercept(
      'GET',
      `${api}inauthor:%22test%22&startIndex=0&maxResults=10`,
      {
        fixture: 'nocards.json',
      }
    ).as('getData');
    cy.findByTestId('select').select('inauthor');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.wait('@getData');
    cy.findByText('No books were found with the author test :(').should(
      'exist'
    );
  });

  it('tests for API time out', () => {
    cy.intercept('GET', `${api}intitle:%22test%22&startIndex=0&maxResults=10`, {
      statusCode: 408,
    }).as('getData');
    cy.findByTestId('select').select('intitle');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.wait('@getData').then(({ response }) => {
      expect(response.statusCode).to.eq(408);
      cy.findByText('The request timed out. Please try again later').should(
        'exist'
      );
    });
  });

  it('tests for API error', () => {
    cy.intercept('GET', `${api}intitle:%22test%22&startIndex=0&maxResults=10`, {
      statusCode: 404,
    }).as('getData');
    cy.findByTestId('select').select('intitle');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.wait('@getData').then(({ response }) => {
      expect(response.statusCode).to.eq(404);
      cy.findByText(
        "Something went wrong :( Please speak to the developer with the search term: 'test' and the error message: '404 Not Found'"
      ).should('exist');
    });
  });
});
