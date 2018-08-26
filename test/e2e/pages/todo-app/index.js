import Page from '../page'

class TodoAppPage extends Page {
  get title() {
    return browser.element('h2')
  }

  get spinner() {
    return browser.element('#loadingSpinner')
  }

  get input() {
    return browser.element('form input')
  }


  get helpText() {
    return browser.element('form .help-block')
  }

  open() {
    super.open()
    this.waitForAsyncLoad()
  }

  reload() {
    this.open()
  }

  waitForAsyncLoad() {
    this.spinner.waitForVisible(10000, true);
  }
}

export default new TodoAppPage()
