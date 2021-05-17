/// <reference types="cypress" />

describe('Sudoku', () => {
  it('renders', () => {
    cy.clock() // freeze the clock
    cy.visit('/')
    // on easy setting there are 45 filled cells at the start
    cy.get('.game__cell--filled').should('have.length', 45)
    cy.contains('.status__time', '00:00')
    cy.contains('.status__difficulty-select', 'Easy')

    // different screenshots using cy.screenshot command
    // see https://on.cypress.io/screenshot
    cy.screenshot({
      capture: 'runner',
    })
    cy.screenshot() // just the app
    cy.get('.status').screenshot('status') // element
  })
})
