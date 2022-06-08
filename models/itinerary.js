const db = require("../db/db")

const Itinerary = {
  findAll: () => {
    const sql = 'SELECT trips.id AS trips_id, trips.name, itineraries.start_location, itineraries.end_location, itineraries.start_date, itineraries.end_date, itineraries.start_time, itineraries.end_time, itineraries.activities, itineraries.notes, itineraries.checklist FROM itineraries INNER JOIN trips ON trips.id = itineraries.id;'
    return db
    .query(sql)
    .then(dbRes => dbRes.rows)
  },

  create: (start_location, end_location, start_date, end_date, start_time, end_time, activities, notes, checklist) => {
    const sql = `
    INSERT INTO itineraries(start_location, end_location, start_date, end_date, start_time, end_time, activities, notes, checklist) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    `
    return db.query(sql, [start_location, end_location, start_date, end_date, start_time, end_time, activities, notes, checklist])
    .then(dbRes => dbRes.rows[0])
  }
}

module.exports = Itinerary