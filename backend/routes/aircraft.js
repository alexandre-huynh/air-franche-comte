const express = require('express');
const router = express.Router();
const db = require('../db'); 
const { authMiddleware } = require('../middleware/auth');

// GET all aircraft with availability
router.get('/', async (req, res) => {
  const [aircrafts] = await db.query(`
    SELECT a.*, 
      GROUP_CONCAT(DISTINCT CONCAT(r.start_datetime, '|', r.end_datetime) SEPARATOR ',') AS reservations
    FROM aircraft a
    LEFT JOIN reservations r ON r.aircraft_id = a.id AND r.status != 'cancelled'
    GROUP BY a.id
  `);
  res.json(aircrafts);
});

// POST reservation (requires login)
router.post('/reserve', authMiddleware, async (req, res) => {
  const { aircraft_id, start_datetime, end_datetime, aerodrome_id } = req.body;
  await db.query(`
    INSERT INTO reservations (user_id, aircraft_id, start_datetime, end_datetime, status)
    VALUES (?, ?, ?, ?, 'pending')
  `, [req.user.id, aircraft_id, start_datetime, end_datetime]);
  res.json({ success: true });
});

module.exports = router;
