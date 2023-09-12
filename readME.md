## create database with users and posts table in postgres:

- CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  social_id VARCHAR(255),
  user_name VARCHAR(255),
  email VARCHAR(255),
  provider VARCHAR(255),
  password VARCHAR(255)
  );

- CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  userid INT REFERENCES users(id),
  title VARCHAR(100) NOT NULL,
  blog TEXT,
  private BOOLEAN
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

## login methods

- google login (social login)
- facebook login (social login)
- manual login using email and password
- - warning: don't use uncreated email
- - social login can takeover manual login and migrated, if manual email matched with social login

## postman api url

- https://documenter.getpostman.com/view/27265804/2s9YC32ZyW
