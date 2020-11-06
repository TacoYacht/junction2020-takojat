// task_repository.js

class TaskRepository {
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
  }
  
  module.exports = TaskRepository;