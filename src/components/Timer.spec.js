/// <reference types="cypress" />
import React from 'react'
import { Timer } from './Timer'
import { mount } from 'cypress-react-unit-test'
import '../App.css'
import { SudokuContext } from '../context/SudokuContext'

describe('Timer', () => {
  it('counts seconds', () => {
    mount(
      <SudokuContext.Provider value={{ timeGameStarted: Cypress.moment() }}>
        <div className="innercontainer">
          <section className="status">
            <Timer />
          </section>
        </div>
      </SudokuContext.Provider>,
    )
    cy.contains('.status__time', '00:00')
    cy.contains('.status__time', '00:01')
    cy.contains('.status__time', '00:02')
    cy.contains('.status__time', '00:03')
  })

  it('shows the timer at zero', () => {
    const now = Cypress.moment()
    cy.clock() // freeze the clock
    mount(
      <SudokuContext.Provider value={{ timeGameStarted: now }}>
        <div className="innercontainer">
          <section className="status">
            <Timer />
          </section>
        </div>
      </SudokuContext.Provider>,
    )
    cy.contains('.status__time', '00:00')
    cy.visualSnapshot()
  })

  it('shows the timer after 700 seconds', () => {
    const now = Cypress.moment()
    cy.clock(now.clone().add(700, 'seconds').toDate())
    mount(
      <SudokuContext.Provider value={{ timeGameStarted: now }}>
        <div className="innercontainer">
          <section className="status">
            <Timer />
          </section>
        </div>
      </SudokuContext.Provider>,
    )
    cy.contains('.status__time', '11:40')
    cy.visualSnapshot()
  })

  it.skip('shows the timer after 700 seconds (using cy.tick)', () => {
    const now = Cypress.moment('2010-01-20')
    cy.clock(now.toDate())
    mount(
      <SudokuContext.Provider value={{ timeGameStarted: now }}>
        <div className="innercontainer">
          <section className="status">
            <Timer />
          </section>
        </div>
      </SudokuContext.Provider>,
    )
    cy.contains('.status__time', '00:00')
    cy.tick(700 * 1000)
    cy.contains('.status__time', '11:40')
  })
})
