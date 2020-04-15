const { User } = require("../models");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

signToken = (user) => {
  return JWT.sign(
    {
      id: user.dataValues.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = {
  signup: (req, res) => {
    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user) {
        return res.status(403).json({ error: "Username exists!" });
      } else {
        User.build({
          firstName: req.body.firstname,
          otherName: req.body.othername,
          email: req.body.email,
          password: req.body.password,
          userLevel: 1,
        })
          .save()
          .then((saved) => {
            console.log("Saving User:", saved);
            const token = signToken(saved);
            res.status(200).json({ token: token });
          })
          .catch((error) => {
            res.status(400).json({ message: "User not saved", error: error });
          });
      }
    });
    console.log(req.body);
  },
};
