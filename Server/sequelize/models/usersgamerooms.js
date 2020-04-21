'use strict';

// This is a very simple model that should only be used when we need to deal with scores and end games
// For everything else, apply the appropriate properties in the User and GameRoom models with this table as the "many-to-many" association
module.exports = (sequelize, DataTypes) => {

  const Game = require('./game')(sequelize, DataTypes);
  const User = require('./user')(sequelize, DataTypes);

  const UsersGameRooms = sequelize.define('UsersGameRooms',
    {
      userId: DataTypes.INTEGER,
      gameRoomId: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      ended: DataTypes.BOOLEAN
    },
    { freezeTableName: true }
  );

  return UsersGameRooms;
};