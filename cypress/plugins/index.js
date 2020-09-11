const percyHealthCheck = require('@percy/cypress/task')

module.exports = (on, config) => {
  on('task', percyHealthCheck)

  require('cypress-react-unit-test/plugins/react-scripts')(on, config)
  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}
