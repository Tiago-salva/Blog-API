const db = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function createUserPost(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.addUser(req.body, hashedPassword);
  res.send("Usuario creado");
}

module.exports = { createUserPost };
