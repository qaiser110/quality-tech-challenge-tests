exports.config = {
  specs: [
    './test/e2e/specs/**/*spec.js',
  ],
  // exclude: ['./test/e2e/pages/**/*.js'],
  maxInstances: 5,
  capabilities: [{
      browserName: 'chrome'
  }],
  sync: true,
  logLevel: 'silent',
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  screenshotPath: './errorShots/',
  baseUrl: 'http://localhost:4000/',
  waitforTimeout: 10000,  // Default timeout for all waitFor* commands
  connectionRetryCount: 3,
  screenshotOnReject: {
    connectionRetryTimeout: 30000,
    connectionRetryCount: 0
  },
  services: ['selenium-standalone'],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: 20000
  },
  reporters: ['spec', 'mochawesome'],
  reporterOptions: {
    outputDir: './report/e2e',
    reportDir: './report/e2e',
    reportFilename:'test-report',
    reportTitle: 'Todo App: UI Test Report',
    mochawesome_filename: 'mochawesome.json',
    overwrite: true,
    autoOpen: true,
    saveHtml: true,
    showPassed: false
  },
  before: function() {
    require('./test/helpers/globals')
    require('./test/e2e/helpers/setup')
  }
}
