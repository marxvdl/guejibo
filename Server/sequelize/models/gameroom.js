'use strict';

module.exports = (sequelize, DataTypes) => {

  const Game = require('./game')(sequelize, DataTypes);
  const User = require('./user')(sequelize, DataTypes);

  const GameRoom = sequelize.define('GameRoom',
    {
      gameId: DataTypes.INTEGER,
      ownerId: DataTypes.INTEGER,
      code: DataTypes.CHAR(4),
      timeStarted: DataTypes.DATE,
      timeEnded: DataTypes.DATE
    },
    { freezeTableName: true }
  );

  GameRoom.associate = (models) => {
    GameRoom.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    GameRoom.belongsTo(models.Game, { foreignKey: 'gameId', as: 'game' });

    GameRoom.belongsToMany(
      models.User,
      {
        foreignKey: 'gameRoomId',
        through: 'UsersGameRooms',
        as: 'users'
      }
    );
  };

  GameRoom.exportObject = (gr) => {
    let obj = {
      id: gr.id,      
      ownerId: gr.ownerId,
      code: gr.code,
      timeStarted: gr.timeStarted,
      timeEnded: gr.timeEnded
    };

    if (gr.hasOwnProperty('game')) {
      obj.game = Game.exportObject(gr.game);
    }
    else{
      obj.gameId = gr.gameId;
    }

    if (gr.hasOwnProperty('users')) {      
      obj.users = gr.users.map(user => User.exportObject(user));
    }

    return obj;
  };

  return GameRoom;

};