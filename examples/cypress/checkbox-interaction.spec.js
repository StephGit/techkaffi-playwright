// cypress/integration/checkbox-interaction.spec.js

describe('Checkbox Interaction', () => {
  it('should check and uncheck todo items', () => {
    // Visit the todo app
    cy.visit('https://example.cypress.io/todo');
    
    // Check the first todo item
    cy.get('.todo-list li').first().find('.toggle').check();
    
    // Verify the todo item is marked as completed
    cy.get('.todo-list li').first().should('have.class', 'completed');
    
    // Uncheck the first todo item
    cy.get('.todo-list li').first().find('.toggle').uncheck();
    
    // Verify the todo item is not marked as completed
    cy.get('.todo-list li').first().should('not.have.class', 'completed');
  });
});
