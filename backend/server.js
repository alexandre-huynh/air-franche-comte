/*===========INIT===========*/
const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const hostname = process.env.HOSTNAME;
const port = 3000;

// const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(helmet());

/*===========API===========*/
//app.use('/api/auth', authRoutes);
app.use('/api/aircraft', require('./routes/aircraft'));

/*===========START SERVER APP===========*/
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
