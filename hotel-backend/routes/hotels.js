const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '../data/db.json')

const readDB = () => JSON.parse(fs.readFileSync(dbPath))
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))

// GET all hotels
router.get('/', (req, res) => {
  const db = readDB()
  res.json(db.hotels)
})

// POST add new hotel
router.post('/', (req, res) => {
  const db = readDB()
  const newHotel = { id: Date.now(), ...req.body }
  db.hotels.push(newHotel)
  writeDB(db)
  res.json(newHotel)
})

// DELETE remove hotel
router.delete('/:id', (req, res) => {
  const db = readDB()
  db.hotels = db.hotels.filter(h => h.id !== Number(req.params.id))
  writeDB(db)
  res.json({ message: 'Hotel deleted' })
})

module.exports = router