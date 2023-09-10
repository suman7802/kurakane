const db = require('../models/db.js');

async function getEmailCreateEmail(profile) {
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1 AND provider = $2', [
      profile._json.email,profile.provider
    ]);
    if (result.rows.length > 0) {
      console.log(`i am reading from google`);
      return result.rows[0];
    } else {
      const insertResult = await db.query(
        'INSERT INTO users (email, provider) VALUES ($1, $2) RETURNING *',
        [profile._json.email, profile.provider]
      );
      console.log(`i am writing from google`);
      return insertResult.rows[0];
    }
  } catch (error) {
    return error;
  }
}

module.exports = getEmailCreateEmail;
