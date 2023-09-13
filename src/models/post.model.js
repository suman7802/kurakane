const db = require('./db');

const postModel = {
  createPost: (userId, title, blog, private) => {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO posts (user_id, title, blog, private) VALUES ($1, $2, $3, $4)';
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
      db.query(
        `SELECT id, title, blog, private, create_date, edit_date FROM posts WHERE PRIVATE = false`,
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

  getPost: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM posts WHERE user_id = $1`,
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

  updatePost: (userId, id, title, blog, private, edit_date) => {
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE posts SET title = $1, blog = $2, private = $3, edit_date = $4 WHERE id = $5 AND user_id = $6';
      const values = [title, blog, private, edit_date, id, userId];
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
        `DELETE FROM posts WHERE id = $1 AND user_id = $2`,
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
