"use strict";

const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const path = require("path");


// serve frontend build
app.use(express.static(path.join(__dirname, "dist")));

// handle React/Vite routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

require("./auth/passport");

// --------------------
// BODY MIDDLEWARE
// --------------------
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

// --------------------
// CORS (MUST BE BEFORE ROUTES)
// --------------------
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// --------------------
// SESSION (FIXED)
// --------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,   // 🔥 FIXED
    cookie: {
      sameSite: "lax",
      secure: false, // true only in production HTTPS
    },
  })
);

// --------------------
// PASSPORT
// --------------------
app.use(passport.initialize());
app.use(passport.session());

// --------------------
// ROUTES
// --------------------
const authRoutes = require("./auth/authRoute");
const eventRoutes = require("./routes/eventRoutes");

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT + "!");
});

console.log("CLIENT_BASE_URL =", process.env.CLIENT_BASE_URL);

app.use((req, res, next) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
});