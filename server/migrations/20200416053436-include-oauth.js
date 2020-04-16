"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "method", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Users", "oauthid", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Users", "displayName", {
        type: Sequelize.STRING,
      }),
      queryInterface.renameColumn("Users", "email", "username"),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "method"),
      queryInterface.removeColumn("Users", "oauthid"),
      queryInterface.removeColumn("Users", "displayName"),
      queryInterface.renameColumn("Users", "username", "email"),
    ]);
  },
};
