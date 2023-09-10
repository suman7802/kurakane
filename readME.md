## create database with users table in postgres:

- CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255),
  provider VARCHAR(255)
  );

## create .env file with following details:

- PORT=
- SECRET=
- JWT_SECRET=
- DB_HOST=
- DB_PORT=
- DB_NAME=
- DB_USER=
- DB_PASSWORD=
- CLIENT_ID=
- CLIENT_SECRET=
- CALLBACK_URL=

## run following commands

- npm install
- npm run dev
- or
- npm run start
