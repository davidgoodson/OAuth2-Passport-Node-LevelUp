const Joi = require("joi");
const JWT = require("jsonwebtoken");

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
  validateSignup: () => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schemas.signUp);
      if (result.error)
        return res.status(400).json({ error: result.error.details[0].message });
      next();
    };
  },
};

const schemas = {
  signUp: {
    firstname: Joi.string().min(3).required(),
    othername: Joi.string().min(3).required(),
    email: Joi.string().min(5).required(),
  },
  webLogin: {
    password: Joi.string().min(5).required(),
    username: Joi.string().min(5).required(),
  },
};
