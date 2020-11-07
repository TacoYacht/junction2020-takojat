
import { AppDAO } from './dao.js'
import { getTasksForUser } from './getTasks.js'
import { TaskRepository } from './taskRepository.js'
import { UserRepository } from './userRepository.js'
import { UserTaskRepository } from './userTaskRepository.js'
import { CourseRepository } from './courseRepository.js'
import { CourseTaskRepository } from './courseTaskRepository.js'
import { PracticeRepository } from './practiceRepository.js'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// dummy data sources
import dummyUsersJSON from './dummy/dummyUsers.js'
import dummyCoursesJSON from './dummy/dummyCourses.js'
import dummyTasksJSON from './dummy/dummyTasks.js'
import dummyPracticesJSON from './dummy/dummyPractices.js'

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
const practiceRepo = new PracticeRepository(dao)

// Create initial tables
await Promise.all([userRepo.createTable(), taskRepo.createTable(), courseRepo.createTable(), practiceRepo.createTable()])
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
  dummyCoursesJSON.map(course => {
    courseRepo.create(course.name)
  })
}

// Fill practices with dummydata
if ((await practiceRepo.getAll()).length === 0) {
  console.log('Filling practices table with dummy data')
  dummyPracticesJSON.map(practice => {
      practiceRepo.create(practice.title, practice.imgpath, practice.description, practice.duration)
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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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

app.get('/getUsers', async (req, res) => {
  // const userId = req.query.userId
  const users = await userRepo.getAll()
  res.send(users)
})

app.post('/tasks', (req, res) => {
  res.send('Will add the tasks later')
})

app.post('/updateTime', async (req, res) => {
  const { userId, taskId, timeToAdd } = req.query
  await userTaskRepo.increaseTimer(userId, taskId, timeToAdd)
  res.status(200).send('Time added to the specified task.')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

app.post('/completeTask', (req, res) => {
  const userid = req.body.userId
  const taskid = req.body.taskId
  userTaskRepo.complete(userid, taskid)
  res.status(204).send('Task completed')
})

app.get('/getPractices', async (req, res) => {
  const practices = await practiceRepo.getAll()
  res.send(practices)
})

app.get('/getPracticeByType', async (req, res) => {
  const practices = await practiceRepo.getByType(req.body.practiceType)
  res.send(practices)
})
