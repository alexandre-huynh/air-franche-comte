const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db');

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../frontend/src/assets/img_uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Upload endpoint
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const filename = req.file.filename;
  const filepath = "/src/assets/img_uploads/" + filename;
  const uploadedBy = null; // to implement

  const sql = "INSERT INTO images (title, image_url, uploaded_by) VALUES (?, ?, ?)";
  db.query(sql, [filename, filepath, uploadedBy], (err, result) => {
    if (err) {
      console.error('DB insert error:', err);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.status(200).json({ message: 'Upload successful', file: filepath });
  });
});

module.exports = router;
