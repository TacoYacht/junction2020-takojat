// courseTaskRepository.js

export class CourseTaskRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      console.log('Creating coursetasks table...')
      const sql = `
        CREATE TABLE IF NOT EXISTS coursetasks (
          FOREIGN KEY (id) REFERENCES courses(courseId),
          FOREIGN KEY (id) REFERENCES tasks(taskId),
          PRIMARY KEY (courseId, taskId))`
      return this.dao.run(sql)
    }
  
    create(courseid, taskid) {
      return this.dao.run(
        'INSERT INTO coursetasks (userId, taskId) VALUES (?, ?)',
        [courseid, taskid])
    }
  
    getByUserId(userid) {
      return this.dao.get(
        `SELECT * FROM coursetasks WHERE userid = ?`,
        [userid])
    }
  
    delete(id) {
      return this.dao.run(
        `DELETE FROM coursetasks WHERE id = ?`,
        [id]
      )
    }
  
    getAll() {
      return this.dao.all(`SELECT * FROM coursetasks`)
    }
  
    increaseTimer(time)
    {
      
    }
  }