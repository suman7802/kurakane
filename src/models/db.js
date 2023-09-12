require('dotenv').config();
const {Pool} = require('pg');

const db = new Pool({
  connectionString: process.env.DB_HOST_WEB,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`connected to db`);
  }
});

module.exports = db;
