require('dotenv').config();
const JWT = require('jsonwebtoken');
const db = require('../models/db');

async function Authentication(req, res, next) {
  const accessToken = req.cookies['access-token-kurakane'];
  if (accessToken) {
    try {
      const userData = JWT.verify(accessToken, process.env.JWT_SECRET);
      if (userData) {
        const provider = 'manual';
        const user = await db.query(
          'SELECT * FROM users WHERE email = $1 AND provider = $2',
          [userData.email, provider]
        );
        req.user = user;
        next();
      }
    } catch (err) {
      return res.status(500).json({error: err});
    }
  } else if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(400).json({error: 'NOT Authenticated'});
  }
}

module.exports = Authentication;
