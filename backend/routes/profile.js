const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.get('/profile', authenticateToken, (req, res) => {
  // req.user contains the decoded token data (e.g., id, username)
  res.json({ message: "Welcome to your profile!", user: req.user });
});

module.exports = router;
