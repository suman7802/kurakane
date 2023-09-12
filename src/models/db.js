require('dotenv').config();
const {Client} = require('pg');

const db = new Client({
  host: 'localhost',
  port: 5432,
  database: 'kurakane',
  user: 'sumans',
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`connected to db`);
  }
});

module.exports = db;
