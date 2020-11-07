
import { AppDAO } from './dao.js'
import { getTasksForUser } from './getTasks.js'
import { TaskRepository } from './taskRepository.js'
import { UserRepository } from './userRepository.js'
import { UserTaskRepository } from './userTaskRepository.js'
import express from 'express'
import cors from 'cors'
import usersToPushToDbJSON from './dummyUsers.js'

const app = express()
const port = 8000

function createDB() {
  console.log('Initializing database...')
  return new AppDAO('./database.sqlite3')
}

// Database and table instances
const dao = createDB()
const taskRepo = new TaskRepository(dao)
const userRepo = new UserRepository(dao)
const userTaskRepo = new UserTaskRepository(dao)

// Create initial tables
await Promise.all([userRepo.createTable(), taskRepo.createTable()])
await userTaskRepo.createTable()

// Fill tables with dummydata
if ((await userRepo.getAll()).length === 0) {
  console.log('Filling users table with dummy data')
  usersToPushToDbJSON.map(user => {
    userRepo.create(user.name, user.isCourse)
  })
}


app.use(cors())

app.get('/', (req, res) => {
  res.send({'Hello World!': "Hello"})
})

app.get('/getTasks', (req, res) => {
  const userId = req.query.userId
  if (userId === undefined) {
      res.status(400).send('User id should be given')
  } else if (isNaN(userId)) {
      res.status(400).send('User id should be number')
  } else {
      const usersTasks = getTasksForUser(userId, dao)
      res.send(usersTasks)
  }
})

app.post('/tasks', (req, res) => {
  res.send('Will add the tasks later')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
