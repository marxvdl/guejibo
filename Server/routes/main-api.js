const models = require('../sequelize/models');
const Game = models.Game;

module.exports = function (app, passport) {

    app.get('/api/games', isLoggedIn(), (req, res) => {     
        Game.findAll().then((result) => {
            res.send(
                result.map( game => Game.exportObject(game) )
            );
        });
    });

    //

    function isLoggedIn() {
        return passport.authenticate('local-jwt', { session: false });
    }
}