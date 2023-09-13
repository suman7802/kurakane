require('dotenv').config();
const {Client, Pool} = require('pg');

const db = new Client({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
});

// const db = new Pool({
//   connectionString: process.env.DB_HOST_WEB,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`connected to db`);
  }
});

module.exports = db;
