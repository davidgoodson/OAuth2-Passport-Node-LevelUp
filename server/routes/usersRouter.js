const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");

const UserControler = require("../controlers/usersControler");

const {
  validateSignup,
  validateLogin,
  authenticate,
} = require("../helpers/validationHelper");

router.route("/signup").post(validateSignup(), UserControler.signup);
router.route("/login").post(validateLogin(), UserControler.login);
router.route("/view").post(authenticate, UserControler.get_users);

//Login with google, for front end purposes, use the oauth/google/callback below for backend and configure as instructed
router.route("/login/google").get(
  (req, res, next) => {
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },
  // Start OAuth 2 flow using Passport.js
  passport.authenticate("googleOAuth", { scope: ["email", "profile"] })
);

//Call Back to google, to Work for Backend POSTMAN Testing, Configure method to POST so that you can provide body of access-token
router
  .route("/login/googleoauth2callback")
  .get(
    passport.authenticate("googleOAuth", { session: false }),
    UserControler.oauth
  );

//Login with facebook, for front end purposes, use the /login/facebookoauth2callback below for backend and configure as instructed
router.route("/login/facebook").get(
  (req, res, next) => {
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },
  // Start OAuth 2 flow using Passport.js
  passport.authenticate("facebookOAuth", {
    authType: "rerequest",
    scope: ["email"],
  })
);

//Call Back to facebook, to Work for Backend POSTMAN Testing, Configure method to POST so that you can provide body of access-token
router.route("/login/facebookoauth2callback").get(
  passport.authenticate("facebookOAuth", {
    session: false,
    authType: "rerequest",
    scope: ["email"],
  }),
  UserControler.oauth
);

module.exports = router;
