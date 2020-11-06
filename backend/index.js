
import { AppDAO } from './dao.js'
import { getTasksForUser } from './getTasks.js'
import express from 'express'
import cors from 'cors'

const app = express();
const port = 8000;

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/getTasks', (req, res) => {
  const userId = req.query.userId
  if (userId === undefined) {
      res.status(400).send('User id should be given')
  } else if (isNaN(userId)) {
      res.status(400).send('User id should be number')
  } else {
      const usersTasks = getTasksForUser(userId)
      res.send(usersTasks)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

function createDB() {
  console.log('Initializing database...')
  const dao = new AppDAO('./database.sqlite3')
}

createDB()