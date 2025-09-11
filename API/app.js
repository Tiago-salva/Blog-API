const path = require("node:path");

require("dotenv").config();

const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

// Custom config
const initializePassport = require("./config/passport-config");

// Import routers
const authRouter = require("./src/routes/authRouter");

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

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.session());

// Routes
app.use("/", authRouter);

app.listen(3000, () => console.log("App listening to port 3000"));
