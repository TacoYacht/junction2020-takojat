// taskRepository.js

export class TaskRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    console.log('Creating tasks table...')
    const sql = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      FOREIGN KEY (id) REFERENCES users(userId))` // add later when there is this table
    return this.dao.run(sql)
  }

  create(name) {
    return this.dao.run(
      'INSERT INTO tasks (name) VALUES (?)',
      [name])
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM tasks WHERE id = ?`,
      [id])
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM tasks WHERE id = ?`,
      [id]
    )
  }

  getAll() {
    return this.dao.all(`SELECT * FROM tasks`)
  }
}