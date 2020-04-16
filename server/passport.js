require("dotenv").config();
const passport = require("passport");
const GoogleOAuth2Strategy = require("passport-google-oauth20").Strategy;
const FacebookOAuth2Strategy = require("passport-facebook").Strategy;
const { User } = require("./models");

passport.use(
  "googleOAuth",
  new GoogleOAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
      accessType: "offline",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("ACCESS TOKEN: ", accessToken);
      console.log("REFRESH TOKEN: ", refreshToken);
      console.log("PROFILE", profile);

      try {
        const existingUser = await User.findOne({
          where: { method: "google", oauthid: profile.id },
        });

        if (existingUser) {
          console.log("USER EXISTS: ", existingUser);
          return done(null, existingUser);
        }

        User.build({
          method: "google",
          username: profile.emails[0].value,
          oauthid: profile.id,
          firstName: profile.name.givenName,
          otherName: profile.name.familyName,
          displayName: profile.displayName,
          userLevel: 1,
        })
          .save()
          .then((saved) => {
            console.log("NEW USER: ", saved);
            done(null, saved);
          })
          .catch((error) => {
            console.log("ERROR SAVING USER: ", error);
            done(error, false);
          });
      } catch (error) {
        console.log("ERROR LOOKINGUP USER: ", error);
        done(error, false);
      }
    }
  )
);

passport.use(
  "facebookOAuth",
  new FacebookOAuth2Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CLIENT_CALLBACK,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("ACCESS TOKEN: ", accessToken);
      console.log("REFRESH TOKEN: ", refreshToken);
      console.log("PROFILE", profile);

      try {
        const existingUser = await User.findOne({
          where: { method: "facebook", oauthid: profile.id },
        });
        if (existingUser) {
          console.log("USER EXISTS: ", existingUser);
          return done(null, existingUser);
        }

        User.build({
          method: "facebook",
          username: profile.emails[0].value,
          oauthid: profile.id,
          firstName: profile.name.givenName,
          otherName: profile.name.familyName,
          displayName: profile.displayName,
          userLevel: 1,
        })
          .save()
          .then((saved) => {
            console.log("NEW USER: ", saved);
            done(null, saved);
          })
          .catch((error) => {
            console.log("ERROR SAVING USER: ", error);
            done(error, false);
          });
      } catch (error) {
        console.log("ERROR LOOKINGUP USER: ", error);
        done(error, false);
      }
    }
  )
);
