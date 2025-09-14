const path = require("node:path");

require("dotenv").config();

const express = require("express");
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");

// Custom config
const initializePassport = require("./config/passport-config");

// Import routers
const authRouter = require("./src/routes/authRouter");
const postRouter = require("./src/routes/postRouter");

// App
const app = express();

// App config
app.set("views", path.join(__dirname, "src", "ejs"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Passport
initializePassport(passport);

// Routes
app.use("/", authRouter);
app.use("/posts", postRouter);

app.listen(process.env.PORT, () =>
  console.log(`App listening to port ${process.env.PORT}`)
);
