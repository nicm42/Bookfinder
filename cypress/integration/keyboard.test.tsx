/// <reference types="Cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference types="cypress-plugin-tab/src" />

//We tested tabbing within components in Jest
//So now we just have to test tabbing between components
//And that they load the books when enter pressed on previous/next buttons
//(All the keyboard search bits are tested in Search)

const apiLinkKeyboard = 'https://www.googleapis.com/books/v1/volumes?q=';

describe('Search tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  it('navigates using only the keyboard', () => {
    cy.intercept(
      'GET',
      `${apiLinkKeyboard}intitle:%22test%22&startIndex=0&maxResults=10`,
      {
        fixture: 'manyCards1.json',
      }
    ).as('getData1');
    cy.intercept(
      'GET',
      `${apiLinkKeyboard}intitle:%22test%22&startIndex=9&maxResults=10`,
      {
        fixture: 'manyCards2.json',
      }
    ).as('getData2');

    cy.get('body').tab();
    cy.focused().should('have.value', '');

    cy.findByTestId('select').type('{downarrow}');
    //cy.focused().should('have.value', 'intitle');
    cy.findByTestId('select').select('intitle').tab();
    //cy.focused().should('have.value', 'intitle');
    cy.findByRole('searchbox').type('test').tab();
    cy.findByRole('button', { name: /search/i }).type('{enter}');
    cy.wait('@getData1');

    cy.findByText('Showing books 1-10').should('exist');
    cy.findAllByRole('button', { name: /next/i }).first().click();
    cy.wait('@getData2');

    cy.findByText('Showing books 11-20').should('exist');
    cy.findByRole('button', { name: /search/i })
      .focus()
      .tab();
    cy.focused().should('have.text', 'Previous').tab();
    cy.focused().should('have.text', 'Next');
    cy.findAllByRole('button', { name: /previous/i })
      .first()
      .click();

    cy.findByText('Showing books 1-10').should('exist');
    cy.findAllByRole('button', { name: /next/i }).first().focus().tab();
    cy.focused().should('have.text', 'More information').tab();
    cy.focused().should('have.text', 'More information').tab();
    cy.focused().should('have.text', 'Next');
  });
});
