const { Router } = require("express");
const { createUserPost, logOut } = require("../controllers/authController");
const passport = require("passport");
const authRouter = new Router();
const jwt = require("jsonwebtoken");
const { isGuest } = require("../middleware/authMiddleware");

require("dotenv").config();

// Login
authRouter.post("/login", isGuest, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token: token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  })(req, res, next);
});

// Sign up
authRouter.post("/sign-up", isGuest, createUserPost);

// Log out
authRouter.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logOut
);

module.exports = authRouter;
