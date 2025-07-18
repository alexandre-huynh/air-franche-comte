const express = require('express')
const router = express.Router()
const db = require('../db')

// GET reserved dates for an aircraft
router.get('/:aircraftId/dates', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT reservation_date FROM reservations WHERE aircraft_id = ? AND status != 'cancelled'`,
      [req.params.aircraftId]
    )
    const dates = rows.map(r => r.reservation_date.toISOString().split('T')[0])
    res.json(dates)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch reserved dates' })
  }
})

// POST create a reservation
router.post('/', async (req, res) => {
  try {
    const { user_id, aircraft_id, airfield_id, reservation_date } = req.body

    if (!user_id || !aircraft_id || !reservation_date) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    const formattedDate = reservation_date.split('T')[0] // ensure YYYY-MM-DD

    // check if date is already reserved
    const [existing] = await db.query(
      `SELECT id FROM reservations WHERE aircraft_id = ? AND reservation_date = ? AND status != 'cancelled'`,
      [aircraft_id, formattedDate]
    )

    if (existing.length > 0) {
      return res.status(400).json({ error: 'This date is already reserved' })
    }

    await db.query(
      `INSERT INTO reservations (user_id, aircraft_id, airfield_id, reservation_date, status) VALUES (?, ?, ?, ?, 'pending')`,
      [user_id, aircraft_id, airfield_id, formattedDate]
    )

    res.json({ message: 'Reservation created' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save reservation' })
  }
})

module.exports = router
