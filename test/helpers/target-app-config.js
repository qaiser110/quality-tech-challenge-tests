const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || '27017'
const DB_NAME = process.env.DB_NAME || 'todos'
const APP_PORT = parseInt(process.env.APP_PORT) || 4000

module.exports = {
  BASE_URL: `http://localhost:${APP_PORT}`,
  DB_URL: `mongodb://${DB_HOST}:${DB_PORT}`,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  APP_PORT
}
