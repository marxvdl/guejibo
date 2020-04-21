'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'UsersGameRooms',
      'ended', 
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'UsersGameRooms',
      'ended'
    );
  }
};
