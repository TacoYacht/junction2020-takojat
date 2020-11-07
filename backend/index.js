
import { AppDAO } from './dao.js'
import { getTasksForUser } from './getTasks.js'
import { TaskRepository } from './taskRepository.js'
import { UserRepository } from './userRepository.js'
import { UserTaskRepository } from './userTaskRepository.js'
import { CourseRepository } from './courseRepository.js'
import { CourseTaskRepository } from './courseTaskRepository.js'
import express from 'express'
import cors from 'cors'

// dummy data sources
import usersToPushToDbJSON from './dummy/dummyUsers.js'
import coursesToPushToDbJSON from './dummy/dummyCourses.js'
import dummyTasksJSON from './dummy/dummyTasks.js'

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
const courseRepo = new CourseRepository(dao)
const courseTaskRepo = new CourseTaskRepository(dao)

// Create initial tables
await Promise.all([userRepo.createTable(), taskRepo.createTable(), courseRepo.createTable()])
await courseTaskRepo.createTable() // Needs course and tasks
await userTaskRepo.createTable() // Needs User and tasks

// Fill usertable with dummydata
if ((await userRepo.getAll()).length === 0) {
  console.log('Filling users table with dummy data')
  await Promise.all(dummyUsersJSON.map(async user => {
    userRepo.create(user.name, user.isCourse)
  }))
}

// Fill coursetable with dummydata
if ((await courseRepo.getAll()).length === 0) {
  console.log('Filling courses table with dummy data')
  coursesToPushToDbJSON.map(course => {
    courseRepo.create(course.name)
  })
}

if ((await taskRepo.getAll()).length === 0) {
  console.log('Filling tasks table with dummy data')
  await Promise.all(dummyTasksJSON.map(async task => {
    taskRepo.create(task.name, task.description)
  }))
}

if ((await userTaskRepo.getAll()).length === 0) {
  console.log('Filling userTasks table with dummy data')
  await Promise.all(dummyUsersJSON.map(async (user) => {
    const userId = (await userRepo.getByName(user.name)).id
    for (const taskId of user.tasks) {
      userTaskRepo.create(userId, taskId)
    }
  }))
}

app.use(cors())

app.get('/', (req, res) => {
  res.send({ 'Hello World!': "Hello" })
})

app.get('/getTasks', async (req, res) => {
  const userId = req.query.userId
  if (userId === undefined) {
    res.status(400).send('User id should be given')
  } else if (isNaN(userId)) {
    res.status(400).send('User id should be number')
  } else {
      const usersTasks = await getTasksForUser(userId, userTaskRepo, taskRepo)
      res.send(usersTasks)
  }
})

app.post('/tasks', (req, res) => {
  res.send('Will add the tasks later')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
