/*===========INIT===========*/
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const hostname = process.env.HOSTNAME;
const port = 3000;

/*===========DB CONNECTION===========*/
const db = mysql.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});


/*===========START SERVER APP===========*/
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});


app.use('/api/aircraft', require('./routes/aircraft'));
