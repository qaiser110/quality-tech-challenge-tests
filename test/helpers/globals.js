const request = require('supertest')
const addContext = require('mochawesome/addContext')
const chai = require('chai')
const chaiMatchPattern = require('chai-match-pattern');
chai.use(chaiMatchPattern);

const { BASE_URL } = require('./target-app-config')

global._ = chaiMatchPattern.getLodashModule()
global.expect = chai.expect
global.addContext = addContext
global.api = request(`${BASE_URL}/api`)

// Log to HTML Report
global.log = (test, title, value) => addContext(test, !value ? title : { title, value })

// Take a screenshot and add it to the HTML report
global.snap = function(test) {
  const image = browser.saveScreenshot().toString('base64')
  addContext(test, `data:image/png;base64,${image}`)
}
