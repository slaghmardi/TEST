const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '../data/db.json')

const readDB = () => JSON.parse(fs.readFileSync(dbPath))
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))

// GET all users
router.get('/', (req, res) => {
  const db = readDB()
  res.json(db.users)
})

// POST add new user
router.post('/', (req, res) => {
  const db = readDB()
  const newUser = { id: Date.now(), ...req.body }
  db.users.push(newUser)
  writeDB(db)
  res.json(newUser)
})

// DELETE remove user
router.delete('/:id', (req, res) => {
  const db = readDB()
  db.users = db.users.filter(u => u.id !== Number(req.params.id))
  writeDB(db)
  res.json({ message: 'User deleted' })
})

module.exports = router