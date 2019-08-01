Cypress.Commands.add("fillInputText", (id, text, eq = 0) => {
  cy.get(`${id}`).eq(eq)
    .clear()
    .type(text)
    .should('have.value', text)
  cy.get(`${id}`).eq(eq).blur()
  cy.wait(1000)
})

Cypress.Commands.add("signup", (email, name, password) => {
  cy.fillInputText('#email', email)
  cy.fillInputText('#name', name)
  cy.fillInputText('#password', password)

  cy.contains('button', 'Signup').click()
  cy.wait(1000)
  cy.contains('a', 'Add Question')
})

Cypress.Commands.add("logout", () => {
  cy.get('#logout').click()
  cy.contains('button', 'Login')
  cy.url().should('include', '/Login')
})

Cypress.Commands.add("login", (email, password) => {
  cy.visit('http://localhost:8080')
  cy.fillInputText('#email', email)
  cy.fillInputText('#password', password)
  cy.contains('Login').click()
  cy.wait(1000)
})
