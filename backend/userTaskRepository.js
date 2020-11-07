// taskRepository.js

export class UserTaskRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    console.log('Creating userTasks table...')
    const sql = `
      CREATE TABLE IF NOT EXISTS usertasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timer INTEGER DEFAULT 0,
        userId INTEGER,
        taskId INTEGER,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (taskId) REFERENCES tasks(id))`
    return this.dao.run(sql)
  }

  create(userId, taskId) {
    return this.dao.run(
      'INSERT INTO userTasks (userId, taskId) VALUES (?, ?)',
      [userId, taskId])
  }

  getByUserId(userId) {
    return this.dao.all(
      `SELECT * FROM userTasks WHERE userId = ?`,
      [userId])
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM userTasks WHERE id = ?`,
      [id]
    )
  }

  getAll() {
    return this.dao.all(`SELECT * FROM userTasks`)
  }

  increaseTimer(time)
  {
    
  }
}