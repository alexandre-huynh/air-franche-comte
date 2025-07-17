/*===========INIT===========*/
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

/*===========WEB PAGES===========*/
app.use(express.static(path.join(__dirname, 'public')));

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