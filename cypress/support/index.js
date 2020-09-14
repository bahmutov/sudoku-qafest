import '@percy/cypress'
require('cypress-react-unit-test/support')

// custom command to make taking snapshots with full name
// formed from the test title + suffix easier
Cypress.Commands.add('visualSnapshot', (maybeName) => {
  let snapshotTitle = cy.state('runnable').fullTitle()
  if (maybeName) {
    snapshotTitle = snapshotTitle + ' - ' + maybeName
  }
  cy.percySnapshot(snapshotTitle, {
    widths: [cy.state('viewportWidth')],
    minHeight: cy.state('viewportHeight'),
  })
})
