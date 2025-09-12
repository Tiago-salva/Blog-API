const db = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function createUserPost(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.addUser(req.body, hashedPassword);
  res.send("Usuario creado");
}

async function logOut(req, res) {
  req.logout((err) => {
    if (err) return next(err);
    res.send("Logout con exito");
  });
}

module.exports = { createUserPost, logOut };
