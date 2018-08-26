const { clearTodos, createTodos } = require('../../helpers/api/todo')
import app from '../pages/todo-app'
import todoList from '../pages/todo-app/todo-list'
import alertBox from '../pages/todo-app/alert-box'

describe('Todo App UI', function() {
  beforeEach(function() {
    browser.call(clearTodos)
    app.open()
  })

  it('should display the "All Caught Up" message when Todo List is empty', function() {
    expect(alertBox.container.isVisible()).to.equal(true)
    expect(alertBox.message.getText()).to.include('You do not have any todo items')
    snap(this)
  })

  it('should not display the "All Caught Up" message when Todo List has items', function() {
    browser.call(() => createTodos(1))
    app.open()
    expect(alertBox.container.isVisible()).to.equal(false)
    snap(this)
  })

  it('should allow the user to add a todo item', function() {
    app.input.setValue('my task').keys('Enter')
    app.waitForAsyncLoad()
    expect(todoList.items.length).to.equal(1)
    expect(todoList.items[0].name).to.equal('my task')
    snap(this)
  })

  it('should allow the user mark a todo item as "done"', function() {
    browser.call(() => createTodos(["Not done", "I've done this"]))
    app.open()

    const itemDone = todoList.items[1]
    expect(itemDone.name).to.equal("I've done this")
    expect(itemDone.isDone).to.equal(false)
    itemDone.checkbox.click()
    expect(itemDone.isDone).to.equal(true)

    // make sure the other item is still not done
    expect(todoList.items[0].isDone).to.equal(false)
    snap(this)
  })

  it('should allow the user to mark all todo items as "done"', function() {
    browser.call(() => createTodos(3))
    app.open()
    expect(todoList.items.length).to.equal(3)

    todoList.items.forEach(function(item) {
      expect(item.isDone).to.equal(false)
    })

    todoList.items.forEach(function(item) {
      item.checkbox.click()
    })

    todoList.items.forEach(function(item) {
      expect(item.isDone).to.equal(true)
    })

    expect(todoList.items.length).to.equal(3)
    snap(this)
  })

  it('should allow the user to update a todo item', function() {
    browser.call(() => createTodos(['old task 1', 'old task 2']))
    app.open()
    expect(todoList.items.length).to.equal(2)

    todoList.items[1].input.setValue('changed todo').keys('Enter')
    expect(todoList.items[1].name).to.equal('changed todo')

    // make sure the other item is still unchanged
    expect(todoList.items[0].name).to.equal('old task 1')

    // Verify that the name is changed on the server-side
    app.reload()
    expect(todoList.items[1].name).to.equal('changed todo')
    snap(this)
  })

  it('should allow the user to delete a todo item', function() {
    browser.call(() => createTodos(['item 1', 'item to delete']))
    app.open()
    expect(todoList.items.length).to.equal(2)

    todoList.items[1].deleteIcon.click()
    app.waitForAsyncLoad()
    expect(todoList.items.length).to.equal(1)
    snap(this)
  })

  it('should allow the user to delete all todo items', function() {
    browser.call(() => createTodos(2))
    app.open()
    expect(todoList.items.length).to.equal(2)

    todoList.items[0].deleteIcon.click()
    app.waitForAsyncLoad()

    todoList.items[0].deleteIcon.click()
    app.waitForAsyncLoad()

    expect(todoList.items.length).to.equal(0)
    snap(this)
  })

  it('should show the list of items on loading the app', function() {
    browser.call(() => createTodos(['todo A', 'todo B']))
    app.open()

    expect(todoList.title.getText()).to.equal('Todo Items')
    expect(todoList.items.length).to.equal(2)
    snap(this)
  })

  it('should display the help text when the user enters text in main input field', function() {
    expect(app.helpText.isVisible()).to.equal(false)
    app.input.setValue('hey')
    app.helpText.waitForVisible()
    expect(app.helpText.isVisible()).to.equal(true)
    expect(app.helpText.getText()).to.equal('Hit enter to save')

    app.input.keys('Enter')
    app.waitForAsyncLoad()

    expect(todoList.items[0].name).to.equal('hey')
    expect(app.helpText.isVisible()).to.equal(false)
    snap(this)
  })

  it('should display the help text when the user updates a todo item', function() {
    log(this, 'This test would fail. There is a defect in the app. ' +
      'The help text does not go away when the user hits Enter after updating the todo item')

    browser.call(() => createTodos(2))
    app.open()
    expect(todoList.items.length).to.equal(2)
    const [ item1, item2 ] = todoList.items

    expect(item1.helpText.isVisible()).to.equal(false)
    item1.input.setValue('new')
    item1.helpText.waitForVisible()
    expect(item1.helpText.isVisible()).to.equal(true)
    item1.input.keys('Enter')
    snap(this)

    expect(item1.helpText.isVisible()).to.equal(false)
  })

})
