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
        FOREIGN KEY (id) REFERENCES users(userId),
        FOREIGN KEY (id) REFERENCES tasks(taskId))`
    return this.dao.run(sql)
  }

  create(userid, taskid) {
    return this.dao.run(
      'INSERT INTO userTasks (userId, taskId) VALUES (?, ?)',
      [userid, taskid])
  }

  getByUserId(userid) {
    return this.dao.get(
      `SELECT * FROM userTasks WHERE userId = ?`,
      [id])
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