class TodoAlert {

  get container() {
    return browser.element('#alertContainer')
  }

  get message() {
    return browser.element('#alertText')
  }

}

export default new TodoAlert()
