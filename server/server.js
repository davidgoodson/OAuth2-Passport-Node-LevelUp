const express = require("express");
const bodyParser = require("body-parser");
const usersRoute = require("./routes/usersRouter");

const app = express();

app.use(bodyParser.json());
app.use("/api/users", usersRoute);

module.exports = app;
