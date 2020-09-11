/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'
import { StatusSection } from './StatusSection'
import '../../App.css'

describe('StatusSection', () => {
  it('renders status', () => {
    mount(
      <div className="innercontainer">
        <StatusSection />
      </div>,
    )
    // let's wait for everything to render
    cy.wait(500)

    cy.get('.status__action-mistakes-mode')
      .find('input[type=checkbox]')
      .should('not.be.checked')

    cy.percySnapshot('status')

    cy.log('**turn both modes on**')
    cy.get('.status__action-mistakes-mode')
      .click()
      .find('input[type=checkbox]')
      .should('be.checked')
    cy.get('.status__action-fast-mode')
      .find('input[type=checkbox]')
      .should('not.be.checked')
    cy.get('.status__action-fast-mode')
      .click()
      .find('input[type=checkbox]')
      .should('be.checked')

    cy.percySnapshot('status-both-modes')
  })
})
