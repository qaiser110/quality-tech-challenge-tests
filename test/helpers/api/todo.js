const { MongoClient } = require('mongodb')
const assert = require('assert')

const { DB_URL, DB_NAME } = require('../target-app-config')

const COLLECTION_NAME = 'todos'

/**
 * Removes all items from the todos MongoDB collection.
 *
 * @returns {number} The number of items removed
 */
const clearTodos = () => new Promise(resolve => {
    return MongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, client) => {
      assert.equal(null, err)
      const db = client.db(DB_NAME)
      db.collection(COLLECTION_NAME).deleteMany({}, (err, { result }) => {
        resolve(result.n)
        client.close()
      })
    })
  })

/**
 * Attempts to create a todos item.
 *
 * If the API responds with 418, attempts again
 *   until a non-418 response is returned
 *
 * @param {string} name The name for the todos item
 * @returns {Promise} A Promise for the API POST request
 */
const createTodo = async name => {
  const res = await api.post('/add').send({ name, done: 0 })
  return res.status === 418 ? createTodo(name) : res
}

/**
 * Creates todos for the Array of names or the number of items to create.
 *
 * If `titles` is an Array of strings, creates a todos item for each item in array.
 *
 * @param {Array|number} titles The object to iterate
 * @returns {Object} {name: _id} Pair of todos created in the db
 */
const createTodos = async (titles = ['task 1', 'task 2']) => {
  if (Number(titles))
    titles = new Array(titles).fill().map((n, i) => `todo ${i + 1}`)

  const postTodos = titles.map(name => api.post('/add').send({ name, done: 0 }))
  const todos = await Promise.all(postTodos)

  const nameIdPair = todos.reduce((acc, { body: { _id, name } }) => {
    acc[name] = _id
    return acc
  }, {})
  return nameIdPair
}

module.exports = {
  clearTodos,
  createTodos
}
