const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

const { updateUser, getUserReservations } = require('../controllers/user');
router.get('/', authenticateToken, (req, res) => {
  // req.user contains the decoded token data (e.g., id, username)
  res.json({ message: "Welcome to your profile!", user: req.user });
});

router.put('/', authenticateToken, updateUser);
router.get('/reservations', authenticateToken, getUserReservations);

module.exports = router;
