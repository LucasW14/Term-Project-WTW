require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/userModel");

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userModel.getUserByGoogleId(profile.id);

      if (!user) {
        user = await userModel.createGoogleUser({
          google_id: profile.id.toString(),
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          picture: profile.photos?.[0]?.value
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.google_id);
});

passport.deserializeUser(async (google_id, done) => {
  try {
    const user = await userModel.getUserById(google_id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});