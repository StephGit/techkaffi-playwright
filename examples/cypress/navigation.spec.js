// cypress/integration/navigation.spec.js

describe('Navigation', () => {
  it('should navigate between pages', () => {
    // Visit the todo app
    cy.visit('https://example.cypress.io/todo');
    
    // Verify we're on the todo page
    cy.title().should('include', 'Cypress.io');
    
    // Click on a link to navigate to another page (using the "commands" link in the header)
    cy.get('.navbar-nav').contains('Commands').click();
    
    // Verify we've navigated to the commands page
    cy.url().should('include', '/commands');
    
    // Navigate back
    cy.go('back');
    
    // Verify we're back on the todo page
    cy.url().should('include', '/todo');
  });
});
