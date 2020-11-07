
import { AppDAO } from './dao.js'
import express from 'express'
import cors from 'cors'

const app = express();
const port = 8000;

app.use(cors())

app.get('/', (req, res) => {
  res.send({'Hello World!': "Hello"})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

function createDB() {
  console.log('Initializing database...')
  const dao = new AppDAO('./database.sqlite3')
}

createDB()