declare namespace Cypress {
  interface Chainable<Subject> {
    findByText(tag: string): Chainable<any>;
  }
}
