'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.CHAR(60),
    },
    { freezeTableName: true }
  );

  User.associate = (models) => {
    User.hasMany(
      models.GameRoom,
      {
        foreignKey: 'ownerId',
        as: 'ownedGameRooms'
      }
    );

    User.belongsToMany(
      models.GameRoom,
      {
        foreignKey: 'userId',
        through: 'UsersGameRooms',
        as: 'gameRooms'
      }
    );
  };

  User.exportObject = (user, includeEmail = false) => {
    let obj = {
      id: user.id,
      name: user.name
    };

    if(includeEmail)
      obj.email = user.email;

    return obj;
  };

  return User;
};