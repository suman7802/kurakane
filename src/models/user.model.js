const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();
const db = require('./db');

const user = {
  registration: async (req, res) => {
    console.log(`i am register`);
    const email = req.body.email;
    const password = req.body.password;
    const provider = 'manual';
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      const result = await db.query(
        'SELECT * FROM users WHERE email = $1 AND provider = $2',
        [email, provider]
      );
      if (result.rows.length > 0) {
        return res.status(401).json({status: 'email already exist'});
      } else {
        const insertResult = await db.query(
          'INSERT INTO users (email, password, provider) VALUES ($1, $2, $3) RETURNING *',
          [email, hashedPassword, provider]
        );
        return res.status(200).json({'user registered': insertResult.rows[0]});
      }
    } catch (error) {
      return error;
    }
  },
  login: async (req, res) => {
    console.log(`i am login`);
    const {email, password} = req.body;
    const provider = 'manual';
    try {
      const user = await db.query(
        'SELECT * FROM users WHERE email = $1 AND provider = $2',
        [email, provider]
      );
      if (user.rowCount === 0)
        return res.status(404).json({message: 'User not found'});
      //   Access user data : (user.rows[0].email, user.rows[0].password, user.rows[0].provider)
      if (user.rows[0].password === password) {
        console.log(`here i am again`);
      }

      const passwordMatch = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (!passwordMatch)
        return res.status(400).json({message: 'Invalid credentials'});

      const token = JWT.sign({email: user.email}, process.env.JWT_SECRET);

      return res
        .cookie('access-token-kurakane', token, {
          secure: false,
          Path: '*',
          maxAge: 604800000,
        })
        .status(200)
        .json({message: 'Login successful'});
    } catch (err) {
      return res.status(500).json({message: err.message});
    }
  },
};

module.exports = user;
