"use strict";

const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const path = require("path");

require("./auth/passport");

// --------------------
// BODY MIDDLEWARE
// --------------------
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --------------------
// CORS
// --------------------
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// --------------------
// SESSION
// --------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: false,
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
// STATIC FRONTEND (React/Vite build)
// --------------------
const distPath = path.join(__dirname, "../Frontend/use-react-vite/dist");

app.use(express.static(distPath));

// IMPORTANT: SPA fallback (must be last)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT + "!");
});