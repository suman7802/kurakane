require('dotenv').config();
const JWT = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const db = require('./db');
let t;

const transporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.NODEMAILER_CLIENT_ID,
      process.env.NODEMAILER_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.NODEMAILER_REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER_EMAIL,
        accessToken,
        clientId: process.env.NODEMAILER_CLIENT_ID,
        clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
        refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
      },
    });
    return transporter;
  } catch (err) {
    return err;
  }
};

function generateOTP() {
  return Math.floor(1000 + Math.random() * 90000);
}

(async () => {
  t = await transporter();
})();

async function sendOTP(email, otp) {
  const mailOptions = {
    from: 'mansu7822@gmail.com',
    to: email,
    subject: 'Your OTP for login kurakane',
    text: `Your OTP is: ${otp}\nExpires in 3 minute`,
  };
  return new Promise((resolve, reject) => {
    t.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

async function createGetUser(req, res) {
  const email = req.body.email;
  const provider = 'manual';

  try {
    try {
      var existingEmail = await db.query(
        'SELECT * FROM users WHERE email = $1 AND provider = $2',
        [email, provider]
      );
    } catch (error) {}

    const otp = generateOTP();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 3); // OTP expires in 3 min

    // Send the OTP to the user's email
    try {
      var otpSent = await sendOTP(email, otp);
    } catch (error) {
      return res.status(400).json({message: 'Bad email OTP not sent'});
    }

    // if otp send successfully
    if (otpSent.accepted.length) {
      // if user already exists
      if (existingEmail.rowCount) {
        await db.query(
          'UPDATE users SET otp = $1, otp_expiration = $2 WHERE email = $3 RETURNING *',
          [otp, expirationTime, email]
        );
      } else {
        // creating user
        await db.query(
          'INSERT INTO users (email, provider, otp, otp_expiration) VALUES ($1, $2, $3, $4) RETURNING *',
          [email, provider, otp, expirationTime]
        );
      }
      return res.status(200).json({message: 'OTP sent for login'});
    }
  } catch (error) {
    return res.status(500).json({message: 'Internal server error'});
  }
}

// Function to verify OTP and authenticate
async function authenticate(req, res) {
  const email = req.body.email;
  const otp = req.body.otp;
  const provider = 'manual';

  try {
    // Check if the OTP exists and is not expired
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1 AND provider = $2 AND otp_expiration > NOW()',
      [email, provider]
    );

    if (result.rows.length === 0) {
      await createGetUser({body: {email}}, res);
    } else if (result.rows[0].otp != otp) {
      return res.status(400).json({message: 'incorrect OTP'});
    } else {
      // Generate a JWT token for authentication
      const token = JWT.sign(
        {email: result.rows[0].email},
        process.env.JWT_SECRET
      );
      return res
        .cookie('access-token-kurakane', token, {
          secure: false,
          path: '/',
          maxAge: 30 * 24 * 60 * 60, // 30 days
        })
        .status(200)
        .json({message: 'Login successful'});
    }
  } catch (error) {
    return res.status(500).json({message: 'Internal server error to login'});
  }
}

module.exports = authenticate;
