const db = require("../models/postModel");

async function addPost(req, res) {
  try {
    const post = await db.addPost({
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id,
      published: req.body.published,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Could not create post" });
  }
}

module.exports = { addPost };
