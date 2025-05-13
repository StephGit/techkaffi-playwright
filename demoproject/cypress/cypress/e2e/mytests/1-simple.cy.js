describe('to-do app', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo');
  });

  it('add new todo items', () => {
    const newItem = 'Feed the cat';

    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`);

    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem);
  });

  it('checkbox interaction', () => {
    cy.get('.todo-list li:first').find('input[type="checkbox"]').check()
    cy.get('.todo-list li:first').find('input[type="checkbox"]').should('be.checked')
  });

  it('navigation', () => {
    cy.get('.filters li:last a').click()
    cy.url().should('contain', '/todo#/completed')
  });

  it('alerts', () => {
    cy.visit('https://example.cypress.io/todo')
    cy.window().its('alert').should('be.undefined')
    cy.get('.todo-list li:first button').click()
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Deleted!')
    })
  });

  it('iframe', () => {
    cy.frame('iframe').find('h1').should('contain', 'TodoMVC')
  });


  it('requests', () => {
    cy.intercept('GET', '/api/todos').as('getTodos')
    cy.wait('@getTodos').then((xhr) => {
      expect(xhr.response.body).to.have.length(3)
    })
  });


});


