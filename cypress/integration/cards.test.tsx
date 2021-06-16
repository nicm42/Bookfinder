/// <reference types="Cypress" />
/// <reference types="@testing-library/cypress" />

const apiLinkCards = 'https://www.googleapis.com/books/v1/volumes?q=';

describe('Card tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  it('has one page of cards', () => {
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

    cy.findAllByRole('img').should('have.length', 4);
    cy.findByText('Title 1').should('exist');
    cy.findByText('by Author 1').should('exist');
    cy.findByText('by Author 2 & Author 3').should('exist');
    cy.findByText('Author missing').should('exist');
    cy.findByText('by Author 4, Author 5 & Author 6').should('exist');
    cy.findByText('Publisher: Publisher 1').should('exist');
    cy.findAllByText('Publisher missing').should('have.length', 2);
    cy.findAllByRole('link').should('have.length', 2);
    cy.findAllByText('Link missing').should('have.length', 2);
  });

  it('has multiple pages of cards', () => {
    cy.intercept(
      'GET',
      `${apiLinkCards}intitle:%22test%22&startIndex=0&maxResults=10`,
      {
        fixture: 'manyCards1.json',
      }
    ).as('getData1');
    cy.intercept(
      'GET',
      `${apiLinkCards}intitle:%22test%22&startIndex=9&maxResults=10`,
      {
        fixture: 'manyCards2.json',
      }
    ).as('getData2');
    cy.intercept(
      'GET',
      `${apiLinkCards}intitle:%22test%22&startIndex=19&maxResults=10`,
      {
        fixture: 'manyCards3.json',
      }
    ).as('getData3');

    cy.findByTestId('select').select('intitle');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.wait('@getData1');
    cy.findByText('Showing books 1-10').should('exist');
    cy.findAllByRole('button', { name: /previous/i }).should('exist');
    cy.findAllByRole('button', { name: /next/i }).should('exist');
    cy.findAllByRole('button', { name: /previous/i }).should('be.disabled');
    cy.findAllByRole('button', { name: /next/i }).should('not.be.disabled');

    cy.findAllByRole('button', { name: /next/i }).first().click();
    cy.wait('@getData2');
    cy.findByText('Showing books 11-20').should('exist');
    cy.findAllByRole('button', { name: /previous/i }).should('not.be.disabled');
    cy.findAllByRole('button', { name: /next/i }).should('not.be.disabled');

    cy.findAllByRole('button', { name: /next/i }).first().click();
    cy.wait('@getData3');
    cy.findByText('Showing books 21-24').should('exist');
    cy.findAllByRole('button', { name: /previous/i }).should('not.be.disabled');
    cy.findAllByRole('button', { name: /next/i }).should('be.disabled');

    cy.findAllByRole('button', { name: /previous/i })
      .first()
      .click();
    cy.findByText('Showing books 11-20').should('exist');
    cy.findAllByRole('button', { name: /previous/i }).should('not.be.disabled');
    cy.findAllByRole('button', { name: /next/i }).should('not.be.disabled');

    cy.findAllByRole('button', { name: /next/i }).first().click();
    cy.findByText('Showing books 21-24').should('exist');
    cy.findAllByRole('button', { name: /previous/i }).should('not.be.disabled');
    cy.findAllByRole('button', { name: /next/i }).should('be.disabled');
  });

  it.only('works when pressing enter on next and previous buttons', () => {
    cy.intercept(
      'GET',
      `${apiLinkCards}intitle:%22test%22&startIndex=0&maxResults=10`,
      {
        fixture: 'manyCards1.json',
      }
    ).as('getData1');
    cy.intercept(
      'GET',
      `${apiLinkCards}intitle:%22test%22&startIndex=9&maxResults=10`,
      {
        fixture: 'manyCards2.json',
      }
    ).as('getData2');

    cy.findByTestId('select').select('intitle');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.wait('@getData1');

    cy.findByText('Showing books 1-10').should('exist');
    cy.findAllByRole('button', { name: /next/i }).first().type('{enter}');
    //TODO above line works, but Cypress complains that you can't type into a button
    //you can only type into buttons...

    cy.wait('@getData2');
    cy.findByText('Showing books 11-20').should('exist');
    cy.findAllByRole('button', { name: /previous/i })
      .first()
      .type('{enter}');
    cy.findByText('Showing books 1-10').should('exist');
  });
});
