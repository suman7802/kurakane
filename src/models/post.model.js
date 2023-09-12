const db = require('./db');

const postModel = {
  createPost: (userId, title, blog, private) => {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO posts (userId, title, blog, private) VALUES ($1, $2, $3, $4)';
      const values = [userId, title, blog, private];
      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getAllPost: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id, title, blog, private FROM posts WHERE PRIVATE = false`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getPost: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM posts WHERE userid = $1`,
        [userId],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  updatePost: (userId, id, title, blog, private) => {
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE posts SET userId = $1, title = $2, blog = $3, private = $4 WHERE id = $5';
      const values = [userId, title, blog, private, id];
      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deletePost: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM posts WHERE id = $1 AND userId = $2`,
        [id, userId],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};

module.exports = postModel;
