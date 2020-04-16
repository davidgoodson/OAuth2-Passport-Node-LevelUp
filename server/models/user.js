"use strict";
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      method: DataTypes.STRING,
      oauthid: DataTypes.STRING,
      firstName: DataTypes.STRING,
      otherName: DataTypes.STRING,
      displayName: DataTypes.STRING,
      userLevel: DataTypes.INTEGER,
      password: DataTypes.STRING,
    },
    {
      setterMethods: {
        password(value) {
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        },
      },
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
