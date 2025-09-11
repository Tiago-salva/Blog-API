const { Router } = require("express");
const { createUserPost } = require("../controllers/authController");
const passport = require("passport");
const authRouter = new Router();

// Login
authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Login successful", user });
    });
  })(req, res, next);
});

// Sign up
authRouter.post("/sign-up", createUserPost);

module.exports = authRouter;
