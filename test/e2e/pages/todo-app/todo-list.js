class TodoList {

  get title() {
    return browser.element('h3')
  }

  get items() {
    return browser
      .elements('#mainContent > div > div > div')
      .value.map(element => new TodoListItem(element))
  }
}

class TodoListItem {
  constructor(wrapper) {
    this.wrapper = wrapper
  }

  get checkbox() {
    return this.wrapper.element('[type="checkbox"]')
  }

  get isDone() {
    return this.checkbox.getValue() === 'true'
  }

  get input() {
    return this.wrapper.element('input[type="text"]')
  }

  get name() {
    return this.input.getValue()
  }

  get deleteIcon() {
    return this.wrapper.element('#deleteTask')
  }

  get helpText() {
    return this.wrapper.element('#helpBlock')
  }
}

export default new TodoList()
