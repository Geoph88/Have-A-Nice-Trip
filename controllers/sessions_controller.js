const express = require('express')
const router = express.Router()

// models
const User = require('../models/user')

// bcrypt
const bcrypt = require('bcrypt')

router.post('/', (req, res) => {
  const { email, password } = req.body

  User
    .findByEmail(email)
    // .findById(id)
    .then(user => {
      const isValidPassword = bcrypt.compareSync(password, user.password_digest)
      if (user && isValidPassword) {
        req.session.userId = user.Id
        console.log(req.session)
        res.json({ userName: user.name })
      }
    })
})

module.exports = router