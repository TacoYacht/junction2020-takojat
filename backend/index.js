
import { AppDAO } from './dao.js'
import { getTasksForUser } from './getTasks.js'
import { TaskRepository } from './taskRepository.js'
import express from 'express'
import cors from 'cors'

const app = express()
const port = 8000

function createDB() {
  console.log('Initializing database...')
  return new AppDAO('./database.sqlite3')
}

const db = createDB()

app.use(cors())

app.get('/', (req, res) => {
  res.send({'Hello World!': "Hello"})
});

app.get('/getTasks', (req, res) => {
  const userId = req.query.userId
  if (userId === undefined) {
      res.status(400).send('User id should be given')
  } else if (isNaN(userId)) {
      res.status(400).send('User id should be number')
  } else {
      const usersTasks = getTasksForUser(userId, db)
      res.send(usersTasks)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

function createAppDB() {
  console.log('Initializing database...')
  const dao = new AppDAO('./database.sqlite3')
  const taskRepo = new TaskRepository(dao)
}

createAppDB()
