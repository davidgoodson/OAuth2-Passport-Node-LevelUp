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
      expiresIn: "5m",
    }
  );
};

module.exports = {
  signup: (req, res) => {
    User.findOne({ where: { username: req.body.username } }).then((user) => {
      if (user) {
        return res.status(403).json({ error: "Username exists!" });
      } else {
        User.build({
          firstName: req.body.firstname,
          otherName: req.body.othername,
          method: "local",
          displayName: firstName,
          username: req.body.username,
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

  login: (req, res) => {
    console.log("Logging In");
    User.findOne({ where: { username: req.body.username } }).then((user) => {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.dataValues.password,
          (err, same) => {
            if (err)
              return res.status(400).json({ error: "Authentication Failed!" });
            if (same) {
              const token = signToken(user);
              return res.status(200).json({ token: token });
            } else {
              return res.status(403).json({ error: "Invalid Password!" });
            }
          }
        );
      } else {
        return res
          .status(400)
          .json({ error: "User does not exist in our system." });
      }
    });
  },
  oauth: (req, res) => {
    const token = signToken(req.user);
    return res.status(200).json({ token: token });
  },
  get_users: (req, res) => {
    return res.status(200).json({ message: "You're in" });
  },
};
