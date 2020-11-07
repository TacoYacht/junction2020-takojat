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
        timer INTEGER,
        FOREIGN KEY (id) REFERENCES users(userid),
        FOREIGN KEY (id) REFERENCES tasks(taskid))`
    return this.dao.run(sql)
  }

  create(userid, taskid) {
    return this.dao.run(
      'INSERT INTO userTasks (name) VALUES (?)',
      [userid, taskid])
  }

  getByUserId(userid) {
    return this.dao.get(
      `SELECT * FROM userTasks WHERE userid = ?`,
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