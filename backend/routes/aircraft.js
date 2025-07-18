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
        a.year,
        a.price,
        a.price_with_tax,
        a.tips_price,
        a.capacity,
        a.range_km,
        a.max_speed_kmh,
        a.has_wifi,
        a.luggage_capacity_kg,
        a.description,
        a.airfield_id,
        af.name AS airfield_name,
        i.image_url
      FROM aircraft a
      LEFT JOIN images i ON a.image_id = i.id
      LEFT JOIN airfields af ON a.airfield_id = af.id
      ORDER BY a.id
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch aircraft data' });
  }
});

// GET /api/aircraft/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.id,
        a.name,
        a.manufacturer,
        a.model,
        a.year,
        a.price,
        a.price_with_tax,
        a.tips_price,
        a.capacity,
        a.range_km,
        a.max_speed_kmh,
        a.has_wifi,
        a.luggage_capacity_kg,
        a.description,
        a.airfield_id,
        af.name AS airfield_name,
        i.image_url
      FROM aircraft a
      LEFT JOIN images i ON a.image_id = i.id
      LEFT JOIN airfields af ON a.airfield_id = af.id
      WHERE a.id = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Aircraft not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch aircraft data' });
  }
});

module.exports = router;
