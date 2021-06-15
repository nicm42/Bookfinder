/// <reference types="Cypress" />
/// <reference types="@testing-library/cypress" />

const api = 'https://www.googleapis.com/books/v1/volumes?q=';

describe('API tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  it('tests loading spinner shows up when it should', () => {
    //https://blog.dai.codes/cypress-loading-state-tests/#
    let sendResponse;
    const trigger = new Promise((resolve) => {
      sendResponse = resolve;
    });
    cy.intercept(
      'GET',
      `${api}intitle:%22test%22&startIndex=0&maxResults=10`,
      (request) =>
        trigger.then(() => {
          request.reply();
          /* request.reply(($res) => {
            $res.send({ fixture: 'cards.json' });
            expect($res.statusCode).to.equal(200);
            expect($res.statusMessage).to.equal('OK');
          }); */
        })
    );
    cy.findByTestId('select').select('intitle');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.findByTestId('loading')
      .should('exist')
      .then(() => {
        sendResponse();
        cy.findByTestId('loading').should('not.exist');
      });
  });

  it('gets one page of cards', () => {
    cy.intercept('GET', `${api}intitle:%22test%22&startIndex=0&maxResults=10`, {
      fixture: 'cards.json',
    }).as('getData');
    cy.findByTestId('select').select('intitle');
    cy.findByRole('searchbox').type('test');
    cy.findByRole('button', { name: /search/i }).click();
    cy.wait('@getData');
    cy.findByText('Showing books 1-4').should('exist');
    cy.findByTestId('loading').should('not.exist');
    cy.findByTestId('select').should('have.value', '');
    cy.findByRole('searchbox').should('have.value', '');
    cy.findByRole('button', { name: /previous/i }).should('not.exist');
    cy.findByRole('button', { name: /next/i }).should('not.exist');
  });
});
