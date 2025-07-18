const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const authenticateToken = require('../middleware/auth')

const { updateUser, getUserReservations } = require('../controllers/user')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir)
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `user-${req.user.id}-${Date.now()}${ext}`)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      cb(new Error('Only .png and .jpeg format allowed!'), false)
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }
})

router.get('/', authenticateToken, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user })
})

// upload.single('profile_photo') pour le fichier avatar
router.put('/', authenticateToken, upload.single('profile_photo'), updateUser)

router.get('/reservations', authenticateToken, getUserReservations)

module.exports = router
