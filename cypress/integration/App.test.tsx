it('should work', () => {
  cy.get('h1').should('have.text', 'Book Search');
});
