'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('User', ['email'], {
      type: 'unique',
      name: 'unique_email'
    });
  },

  down: (queryInterface, Sequelize) => {
    return  queryInterface. removeConstraint('User', 'unique_email');
  }
};
