// userRepository.js

// Some dummy data
// const users = [
//     {
//       name: 'Read chapter ',
//       description: ''
//     }
//   ]
  
  export class UserRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      console.log('Creating user table...')
      const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        isCourse INTEGER)`
      return this.dao.run(sql)
    }
  
    create(name, isCourse) {
      return this.dao.run(
        'INSERT INTO users (name, isCourse) VALUES (?, ?)',
        [name, isCourse])
    }
  
    getById(id) {
      return this.dao.get(
        `SELECT * FROM users WHERE id = ?`,
        [id])
    }
  
    delete(id) {
      return this.dao.run(
        `DELETE FROM users WHERE id = ?`,
        [id]
      )
    }
  
    getAll() {
      return this.dao.all(`SELECT * FROM users`)
    }
  }