'use strict';
module.exports = (sequelize, DataTypes) => {

  const Game = sequelize.define('Game', 
    {
      name: DataTypes.STRING,
      basePath: DataTypes.STRING
    }, 
    { freezeTableName: true }
  );

  Game.associate = (models) => {
    Game.hasMany(models.GameRoom, {foreignKey: 'gameId', as: 'gameRooms'});
  };

  Game.exportObject = (game) => {
    return {
      id: game.id,
      name: game.name,
      path: game.basePath
    };
  };

  return Game;
  
};