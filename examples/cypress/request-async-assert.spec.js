// cypress/integration/request-async-assert.spec.js

describe('Async Request with Assertions', () => {
  it('should intercept and verify network requests', () => {
    // Visit the network requests example page
    cy.visit('https://example.cypress.io/commands/network-requests');
    
    // Intercept network requests
    cy.intercept('GET', '**/comments/*', {
      statusCode: 200,
      body: {
        body: 'Cypress intercepted and modified this response',
        email: 'test@example.com',
        id: 123,
        name: 'Test User'
      }
    }).as('getComment');
    
    // Click the button that triggers the GET request
    cy.get('.network-btn.btn.btn-primary').click();
    
    // Wait for the intercepted request
    cy.wait('@getComment');
    
    // Verify the response content in the UI
    cy.get('.network-comment').should('contain', 'Cypress intercepted and modified this response');
    
    // Example of asserting on the actual response
    cy.intercept('GET', '**/comments/*').as('getCommentAgain');
    cy.get('.network-btn.btn.btn-primary').click();
    
    // Wait for the request and make assertions on it
    cy.wait('@getCommentAgain').then((interception) => {
      // Assert on response properties
      expect(interception.response.statusCode).to.equal(200);
      
      // Assert on response body
      expect(interception.response.body.body).to.equal('Cypress intercepted and modified this response');
    });
  });
});
