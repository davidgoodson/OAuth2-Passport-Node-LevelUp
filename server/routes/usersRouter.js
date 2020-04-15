const router = require("express-promise-router")();
const passport = require("passport");

const UserControler = require("../controlers/usersControler");

const {
  validateSignup,
  validateLogin,
  authenticate,
} = require("../helpers/validationHelper");

router.route("/signup").post(validateSignup(), UserControler.signup);
router.route("/login").post(validateLogin(), UserControler.login);
router.route("/view").post(authenticate, UserControler.get_users);

module.exports = router;
