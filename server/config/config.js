require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "nop_development",
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "nop_test",
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "nop_production",
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false,
  },
};
