describe('I can Signup and Login/Logout', () => {
  it('completes signup process and logins to the system', () => {
    cy.visit('http://localhost:8080')
    cy.contains("Don't have an account?").click()
    cy.url().should('include', '/signup')
    cy.signup('test-email@email.com', 'test name', 'fakePassword')
  })
  it('Can logout', () => {
    cy.logout()
  })
})
