const express = require('express')
const router = express.Router()

const Trip = require('../models/trip')

router.get('/:userId', (req, res) => {
  const userId = req.session.userId
  Trip.findAll(userId)
  .then(trips => res.json(trips)) 
})

router.post('/:userId', (req, res) => {
  const userId = req.session.userId
  const {name, start_date, end_date} = req.body
  Trip
  .create(userId, name, start_date, end_date)
  .then(trip => res.json(trip))
})

router.put('/', (req, res) => {
  const {name, start_date, end_date} = req.body
  Trip
  .create(name, start_date, end_date)
  .then(trip => res.json(trip))
})

router.delete('/:id', (req, res) => {
  const tripId = req.params.id

  Trip
  .delete(tripId)
  .then(() => res.json({message: 'deleted successfully'}))
})

module.exports = router