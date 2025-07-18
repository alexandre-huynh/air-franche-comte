/*===========INIT===========*/
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const hostname = process.env.HOSTNAME || 'localhost' || '127.0.0.1';
const path = require('path')

const port = 3000;

/*===========ROUTES===========*/
const authRoutes = require('./routes/auth');
//const profileRoutes = require('./routes/profile');

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json());
app.use(
    helmet({
      crossOriginOpenerPolicy: false, // désactive le header COOP
      crossOriginResourcePolicy: {
        policy: "cross-origin" // assouplit le CORP pour autoriser cross-origin
      }
    })
);


/*===========API===========*/
app.use('/api/auth', authRoutes);
app.use('/api/aircraft', require('./routes/aircraft'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/profile', require('./routes/profile'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

/*===========START SERVER APP===========*/
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
