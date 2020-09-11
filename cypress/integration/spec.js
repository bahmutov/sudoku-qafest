/// <reference types="cypress" />

describe('Sudoku', () => {
  context('on mobile', () => {
    beforeEach(() => {
      cy.viewport(300, 600)
      cy.visit('/')
    })

    it('plays on mobile', () => {
      // on easy setting there are 45 filled cells at the start
      cy.get('.game__cell--filled').should('have.length', 45)
      cy.contains('.status__time', '00:00')
      cy.contains('.status__difficulty-select', 'Easy')
      cy.percySnapshot('mobile', { widths: [300] })
    })
  })
})
