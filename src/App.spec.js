/// <reference types="cypress" />
import React from 'react'
import { App } from './App'
import { mount } from 'cypress-react-unit-test'
import * as UniqueSudoku from './solver/UniqueSudoku'
import initArray from '../cypress/fixtures/init-array.json'
import solvedArray from '../cypress/fixtures/solved-array.json'

describe('App', () => {
  it('mocks board creation', () => {
    // load JSON files using cy.fixture calls
    // https://on.cypress.io/fixture
    cy.fixture('init-array').then((initArray) => {
      cy.fixture('solved-array').then((solvedArray) => {
        cy.stub(UniqueSudoku, 'getUniqueSudoku').returns([
          initArray,
          solvedArray,
        ])
      })
    })
    cy.clock()
    mount(<App />)
    cy.get('.game__cell--filled').should('have.length', 45)
    // the visual snapshot will be the same
    cy.visualSnapshot()
  })

  it('plays one move', () => {
    // stub method import using JSON objects
    cy.stub(UniqueSudoku, 'getUniqueSudoku').returns([initArray, solvedArray])
    cy.clock()
    mount(<App />)
    cy.get('.game__cell').first().click()
    cy.contains('.status__number', '6').click()
    cy.get('.game__cell')
      .first()
      .should('have.class', 'game__cell--highlightselected')
    cy.visualSnapshot()
  })

  it('plays to win', () => {
    // start with all but the first cell filled with solved array
    const almostSolved = [...solvedArray]
    // by setting entry to "0" we effectively clear the cell
    almostSolved[0] = '0'
    cy.stub(UniqueSudoku, 'getUniqueSudoku')
      .returns([almostSolved, solvedArray])
      .as('getUniqueSudoku')
    cy.clock()
    mount(<App />)
    cy.visualSnapshot('1 game is almost solved')

    cy.get('.game__cell').first().click()

    // we can even look at the solved array!
    cy.contains('.status__number', solvedArray[0]).click()
    // winning message displayed
    cy.get('.overlay__text').should('be.visible')
    cy.visualSnapshot('2 game is solved')

    // clicking the overlay starts the new game
    cy.get('@getUniqueSudoku').should('have.been.calledOnce')
    cy.get('.overlay__text').click()
    cy.get('.overlay').should('not.be.visible')
    cy.get('@getUniqueSudoku').should('have.been.calledTwice')
  })
})
