describe('I can add questions', () => {
  before(() => {
    cy.login('test-email@email.com', 'fakePassword')
  })
  it('Adds a questions with options', () => {
    cy.contains('a', 'Add Question').click()
    cy.fillInputText('#title', 'Problem # 1.12')
    cy.fillInputText('#body', 'This is a test body')
    cy.contains('button', 'Add Option').click()
    cy.contains('button', 'Add Option').click()
    cy.fillInputText('#option-0', 'Option A')
    cy.fillInputText('#option-1', 'Option B')
    cy.get('#set-correct-0').click()
    cy.contains('(Current Answer)')
    cy.contains('button', 'Save').click()
    cy.wait(1500)
    cy.contains('button', 'Delete')
    cy.get('.title.-question.-selected').contains('a', 'Problem # 1.12')
    cy.logout()
  })
})
