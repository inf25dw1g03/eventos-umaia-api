/* eslint-disable linebreak-style */
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'HornachegoPor_5',
  database: 'maia_campus_event',
});

connection.connect((err) => {
  if (err) {
    console.log('Error on database connection.');
    throw err;
  }
  console.log('Database connection active.');
});

module.exports = connection;
