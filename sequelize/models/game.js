'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING
  }, { freezeTableName: true });
  Game.associate = function(models) {
    Game.hasMany(models.GameRoom, {foreignKey: 'gameId', as: 'gameRooms'});
  };
  return Game;
};