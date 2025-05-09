describe('to-do app', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo');
  });

  it('add new todo items', () => {
    const newItem = 'Feed the cat';

    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`);

    cy.get('.todo-list li')
      .should('have.length', 1)
      .last()
      .should('have.text', newItem);
  });
});
