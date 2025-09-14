const passport = require("passport");
const { Router } = require("express");
const { addPost } = require("../controllers/postController");
const { authorizeRole } = require("../middleware/authMiddleware");
const postRouter = new Router();

// Create posts
postRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("ADMIN"),
  addPost
);

// Read posts

// Edit posts

// Delete posts

module.exports = postRouter;
