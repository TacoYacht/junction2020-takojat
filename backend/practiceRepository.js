// practiceRepository.js

export class PracticeRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        console.log('Creating practices table...')
        const sql = `
          CREATE TABLE IF NOT EXISTS practices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            imgpath TEXT,
            description TEXT,
            duration INT
          )`
        return this.dao.run(sql)
      }
    
      getAll() {
          return this.dao.all(`SELECT * FROM practices`)
      }
}