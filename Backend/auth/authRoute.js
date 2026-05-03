const express = require("express");
const passport = require("passport");
const router = express.Router();
const userModel = require("../models/userModel");

const CLIENT_BASE_URL =
  process.env.CLIENT_BASE_URL || "http://localhost:5173";

// --------------------
// START GOOGLE LOGIN
// --------------------
router.get("/google", (req, res, next) => {
  req.logout(() => {
    req.session.destroy(() => {
      next();
    });
  });
}, passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account"
}));

// --------------------
// GOOGLE CALLBACK
// --------------------
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_BASE_URL}/login?error=true`,
    session: true
  }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(`${CLIENT_BASE_URL}/login?error=true`);
    }

    const returnTo = req.session.returnTo || "/events/";
    delete req.session.returnTo;

    res.redirect(`${CLIENT_BASE_URL}${returnTo}`);
  }
);

// GET LOGGED IN USER

router.get("/me", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await userModel.getUserById(req.user.google_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout error" });
    }

    req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;