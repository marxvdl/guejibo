'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'GameRoom',
      'code', Sequelize.CHAR(4)
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'GameRoom',
      'code'
    );
  }
};
