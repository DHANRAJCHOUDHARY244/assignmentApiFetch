const db = require('../connect/connect')
const express = require('express')
const router = express.Router()

router.get('/api-data', (req, res) => {
  const sql = 'SELECT * from api'

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      res.json(rows)
    }
  })
})

module.exports = router
