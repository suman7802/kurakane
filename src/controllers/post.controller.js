const postModel = require('../models/post.model');
const db = require('../models/db');

const postController = {
  addPost: async (req, res) => {
    const userId = req.user.rows[0].id;
    const title = req.body.title;
    const blog = req.body.blog;
    const private = req.body.private;

    // checking for existing title
    const exist = await db.query(`SELECT * FROM posts WHERE title = $1`, [
      title,
    ]);

    if (exist.rowCount) {
      return res.json({status: 'Title exist already'});
    }

    postModel
      .createPost(userId, title, blog, private)
      .then((result) => {
        return res.status(201).json({result});
      })
      .catch((err) => {
        return res.status(400).json({err});
      });
  },

  getAllPost: (req, res) => {
    const userId = req.user.rows[0].id;
    postModel
      .getAllPost(userId)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(400).json({err});
      });
  },

  getPost: (req, res) => {
    const userId = req.user.rows[0].id;
    postModel
      .getPost(userId)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(400).json({err});
      });
  },

  updatePost: (req, res) => {
    const userId = req.user.rows[0].id;
    const edit_date = new Date();

    const id = req.body.id;
    const title = req.body.title;
    const blog = req.body.blog;
    const private = req.body.private;

    postModel
      .updatePost(userId, id, title, blog, private, edit_date)
      .then((result) => {
        res.status(200).json({result});
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({err});
      });
  },

  deletePost: (req, res) => {
    const id = req.body.id;
    const userId = req.user.rows[0].id;

    postModel
      .deletePost(id, userId)
      .then((result) => {
        res.status(200).json({result});
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({err});
      });
  },
};

module.exports = postController;
