const router = require("express-promise-router")();
const passport = require("passport");

const UserControler = require("../controlers/usersControler");

const { validateSignup } = require("../helpers/validationHelper");

router.route("/signup").post(validateSignup(), UserControler.signup);

module.exports = router;
