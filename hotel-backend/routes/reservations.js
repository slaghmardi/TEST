const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '../data/db.json')

const readDB = () => JSON.parse(fs.readFileSync(dbPath))
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))

// GET all reservations
router.get('/', (req, res) => {
  const db = readDB()
  res.json(db.reservations)
})

// POST add new reservation
router.post('/', (req, res) => {
  const db = readDB()
  const newReservation = { id: Date.now(), ...req.body }
  db.reservations.push(newReservation)
  writeDB(db)
  res.json(newReservation)
})

// DELETE remove reservation
router.delete('/:id', (req, res) => {
  const db = readDB()
  db.reservations = db.reservations.filter(r => r.id !== Number(req.params.id))
  writeDB(db)
  res.json({ message: 'Reservation deleted' })
})

module.exports = router
