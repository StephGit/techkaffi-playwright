// cypress/integration/iframe-support.spec.js

describe('iframe Support', () => {
  it('should interact with elements inside an iframe', () => {
    // Visit the page with iframes
    cy.visit('https://example.cypress.io/commands/querying');
    
    // Get the iframe and interact with its content
    // Note: Cypress requires a custom command or plugin to work with iframes
    // This example uses cy-iframe plugin
    
    // First, we need to use the plugin
    cy.frameLoaded('.demo-frame');
    
    // Then we can interact with the iframe content
    cy.iframe('.demo-frame').find('.btn.btn-large').as('iframeButton');
    
    // Verify the button text
    cy.get('@iframeButton').should('have.text', 'Button');
    
    // Click the button inside the iframe
    cy.get('@iframeButton').click();
    
    // Verify the button state changed after clicking
    cy.get('@iframeButton').should('have.class', 'btn-success');
    
    /* 
    Note: Without the plugin, you would need a custom command like:
    
    Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe, selector) => {
      return cy
        .wrap($iframe)
        .should(iframe => expect(iframe.contents().find(selector)).to.exist)
        .then(iframe => cy.wrap(iframe.contents().find(selector)));
    });
    */
  });
});
