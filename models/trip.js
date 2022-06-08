const db = require("../db/db")

const Trip = {
  findAll: (id) => { 
    const sql = 'SELECT * FROM trips WHERE user_id = $1'

    return db 
    .query(sql, [id])
    .then(dbRES => dbRES.rows)
  }, 

  create: (user_id, name, start_date, end_date) => {
    const sql = `
    INSERT INTO trips(user_id, name, start_date, end_date) VALUES ($1, $2, $3, $4)
    RETURNING *
    `
    
    return db.query(sql, [user_id, name, start_date, end_date])
    .then(dbRes => dbRes.rows[0])
  }, 

  edit: (id) => {
    const sql = `
    SELECT * FROM trips WHERE id = $1
    RETURNING *
    `
    
    return db.query(sql, [id])
    .then(dbRes => dbRes.rows[0])
  }, 


  delete: (tripId) => {
    const sql = `
    DELETE FROM trips WHERE id = $1
    `
    return db.query(sql, [tripId])
  }
}

module.exports = Trip