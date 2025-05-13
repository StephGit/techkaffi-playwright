// cypress/integration/handling-alerts.spec.js

describe('Handling Alerts', () => {
  it('should handle different types of alerts', () => {
    // Visit the actions page with alert examples
    cy.visit('https://example.cypress.io/commands/actions');
    
    // Test confirming an alert
    // Cypress automatically accepts alerts by default, but we can stub the window.confirm
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Are you sure?');
      return true; // Confirm the alert
    });
    
    // Click the button that triggers the alert
    cy.get('.action-confirm').click();
    
    // Verify the result text after confirming the alert
    cy.get('#confirm-answer').should('have.text', 'true');
    
    // Test dismissing an alert
    cy.on('window:confirm', (str) => {
      return false; // Dismiss the alert
    });
    
    // Click the button that triggers the alert again
    cy.get('.action-confirm').click();
    
    // Verify the result text after dismissing the alert
    cy.get('#confirm-answer').should('have.text', 'false');
  });
});
