describe('I can edit questions', () => {
  before(() => {
    cy.login('test-email@email.com', 'fakePassword')
  })
  it('Edits a questions with options', () => {
    cy.contains('a', 'Problem # 1.12 Edited').click()
    cy.get('#deleteQuestionButton').click()
    cy.wait(1500)
    cy.contains('Problem # 1.12 Edited').should('not.exist')
    cy.logout()
  })
})
