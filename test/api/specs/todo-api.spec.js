const { clearTodos, createTodos } = require('../../helpers/api/todo')

describe('Todos API endpoints', () => {
  beforeEach(async function() {
    await clearTodos()
  })

  it('POST /add should create new todo item', async function() {
  /* This test would occasionally fail because the /add API Route
  is sometimes returning 418 status without the body of created todo,
  although the todo is created in DB */

    const { body } = await api
      .post('/add')
      .send({ name: 'Not much', done: 0 })
      .expect(200)

    expect(body).to.matchPattern({
      __v: _.isNumber,
      _id: _.isString,
      name: 'Not much',
      done: false
    })
  })

  it('GET /add should not work', async function() {
    await api
      .get('/add')
      .send({ name: 'Not much', done: 0 })
      .expect(404)
  })

  it('GET /all should return all todo items', async function() {
    await createTodos(50)
    const { body } = await api.get('/all')
    expect(body.length).to.equal(50)
  })

  it('GET /delete/:id should delete the todo by id', async function() {
    // create a todo item for testing delete functionality
    const todoName = 'Should be deleted'
    await createTodos([todoName])

    // verify that the item is actually created
    const { body } = await api.get('/all')
    expect(body.length).to.equal(1)
    expect(body[0].name).to.equal(todoName)

    // delete the item created in previous step
    await api.get(`/delete/${body[0]._id}`)
    const { body: res } = await api.get('/all')
    expect(res.length).to.equal(0)
  })

  it('POST /update/:id should update the todo "name"', async function() {
  /*
    This test would fail.
    It would timeout because of a bug on the server-side API in '/update/:id' route

    On line 74 in app/Routes.js file, the mongoose save() method expects a callback function as its parameter,
    but we're giving it an object, so although the todo gets updated in the mongodb collection,
    the `save` callback never gets called, which is why the express response is never returned back.
    Removing the curly braces inside the todo.save() invocation will fix this issue, like so:

    ``` // line 74
    todo.save(
      function (error, todo) {
        if (error) {
          res.status(400).send('Unable to update todo');
        } else {
          setTimeout(() => res.status(200).json(todo), calcDelay());
        }
      }
    );
    ```
  */
    // create a todo item for testing update functionality
    const todoName = 'Original name'
    await createTodos([todoName])

    // verify that the item is actually created
    const { body } = await api.get('/all')
    expect(body.length).to.equal(1)

    const { name, _id, done } = body[0]
    expect(name).to.equal(todoName)

    // update the item name
    const updatedName = 'Updated name'
    const { body: updateResponse } = await api.post(`/update/${_id}`)
      .send({ name: updatedName, done })

    expectedItem = {
      __v: 0,
      _id,
      name: updatedName, // updated name
      done: false,
    }

    // verify the update Response
    expect(updateResponse).to.eql(expectedItem)

    // verify that the name is updated
    const { body: updatedItem } = await api.get('/all')
    expect(updatedItem[0]).to.eql(expectedItem)
  })

  it('POST /update/:id should update the todo "done" status', async function() {
  /*
    This test would fail. See above test for details.
  */
    // create a todo item for testing update functionality
    const todoName = 'Original name'
    await createTodos([todoName])

    // verify that the item is actually created
    const { body } = await api.get('/all')
    expect(body.length).to.equal(1)

    const { name, _id } = body[0]
    expect(name).to.equal(todoName)

    expectedItem = {
      __v: 0,
      _id,
      name,
      done: true, // updated flag
    }

    // update the "done" status to true
    const { body: updateResponse } = await api.post(`/update/${_id}`)
      .send({ name, done: true })

    // verify the update Response
    expect(updateResponse).to.eql(expectedItem)

    // verify that the name is updated
    const { body: updatedItem } = await api.get('/all')
    expect(updatedItem[0]).to.eql(expectedItem)
  })

  it('POST /update/:id should return an error when name is an empty string', async function() {
  /*
   This test would fail, because there is no handling of empty string on the server-side
   This can be fixed by handling the case in the '/update/:id' API route, like so:

   // app/Routes.js
   todoRoutes.route('/update/:id').post(function (req, res, next) {
    if (!req.body.name || !req.body.done === 'undefined')
      return res.status(400).send('Task name and done flag are required');
  */
    // create a todo item for testing update functionality
    const todoName = 'Original name'
    await createTodos([todoName])
    const { body } = await api.get('/all')

    const res = await api.post(`/update/${body[0]._id}`)
      .send({ name: '' })
      .expect(400)

    expect(res.error.text).to.equal('Task name and done flag are required')
  })

})
