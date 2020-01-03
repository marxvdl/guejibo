const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'iacweb',
    'admin', '123',
    {
        host: 'localhost',
        dialect: 'mariadb',

        define: {
            freezeTableName: true,
            charset: 'utf8',
            timestamps: true
        },

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

