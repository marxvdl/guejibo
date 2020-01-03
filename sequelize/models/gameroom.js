'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameRoom = sequelize.define('GameRoom', {
    gameId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    timeStarted: DataTypes.DATE,
    timeEnded: DataTypes.DATE

  }, { freezeTableName: true });
  GameRoom.associate = function(models) {
    GameRoom.belongsTo(models.User, {foreignKey: 'ownerId', as: 'owner'});
    GameRoom.belongsTo(models.Game, {foreignKey: 'gameId', as: 'game'});

    GameRoom.belongsToMany(
      models.User, 
      { 
        foreignKey: 'gameRoomId',
        through: 'UsersGameRooms',
        as: 'users'        
      }
    );
  };
  return GameRoom;
};