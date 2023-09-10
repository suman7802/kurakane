require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');

const authenticate = require('./routes/authStrategy');
const userRoute = require('./routes/user.route');

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: '*',
    exposedHeaders: ['set-cookie'],
  })
);
app.use(express.json());
app.use(parser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

authenticate(app, passport);
app.use('/api/user', userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
