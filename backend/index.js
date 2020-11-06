const express = require('express')
const AppDAO = require('./dao')
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

function createDB() {
  console.log('Initializing database...')
  const dao = new AppDAO('./database.sqlite3')
}

createDB()