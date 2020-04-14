"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      otherName: DataTypes.STRING,
      userLevel: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
