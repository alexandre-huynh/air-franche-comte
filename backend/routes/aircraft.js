const express = require('express');
const router = express.Router();
const db = require('../db'); // connecting to database

// GET /api/aircraft
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.id,
        a.name,
        a.manufacturer,
        a.model,
        a.description,
        i.image_url
      FROM aircraft a
      LEFT JOIN images i ON a.image_id = i.id
      ORDER BY a.id
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch aircraft data' });
  }
});

module.exports = router;
