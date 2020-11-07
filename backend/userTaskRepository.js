// taskRepository.js

export class UserTaskRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    console.log('Creating userTasks table...')
    const sql = `
      CREATE TABLE IF NOT EXISTS userTasks (
        userId INTEGER,
        taskId INTEGER,
        timer INTEGER DEFAULT 0,
        completed INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user(id),
        FOREIGN KEY (taskId) REFERENCES task(id),
        PRIMARY KEY (userId, taskId)
      )`
    return this.dao.run(sql)
  }

  create(userId, taskId) {
    return this.dao.run(
      'INSERT INTO userTasks (userId, taskId) VALUES (?, ?)',
      [userId, taskId])
  }

  getAllTasksByUserId(userId) {
    return this.dao.all(
      `SELECT * FROM userTasks WHERE userId = ?`,
      [userId])
  }

  getByIds(userId, taskId) {
    return this.dao.get(
      `SELECT * FROM userTasks WHERE userId = ? AND taskId = ?`,
      [userId, taskId])
  }

  delete(userId, taskId) {
    return this.dao.run(
      `DELETE FROM userTasks WHERE userId = ? AND taskId = ?`,
      [userId, taskId]
    )
  }

  getAll() {
    return this.dao.all(`SELECT * FROM userTasks`)
  }

  complete(userid, taskId) {
    return this.dao.run(
      'UPDATE userTasks SET completed = 1 WHERE userId = ? AND taskId = ?'
    )
  }

  async increaseTimer(userId, taskId, timeToAdd) {
    
    const oldTime = await this.dao.get(
      `SELECT timer FROM userTasks WHERE userId = ? AND taskId = ?`,
      [userId, taskId]
    )
    console.log(userId, taskId, timeToAdd)
    console.log(oldTime)
    const newTime = oldTime + timeToAdd
    
    return this.dao.run(
      `UPDATE userTasks SET timer = ? WHERE userId = ? AND taskId = ?`,
      [userId, taskId, newTime]
    )
  }
}