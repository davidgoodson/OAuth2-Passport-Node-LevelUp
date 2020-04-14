var path = require("path");

const paths = {
  config: path.resolve("server", "config/config.json"),
  "migrations-path": path.resolve("server", "migrations"),
  "models-path": path.resolve("server", "models"),
};

console.log(paths["migrations-path"]);
