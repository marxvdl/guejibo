const models = require('../sequelize/models');
const User = models.User;
const Game = models.Game;
const GameRoom = models.GameRoom;

module.exports = function (app, passport) {

    app.get('/api/games', isLoggedIn(), (req, res) => {     
        Game.findAll().then(result => {
            res.send(
                result.map( game => Game.exportObject(game) )
            );
        });
    });

    app.post('/api/gameroom', isLoggedIn(), (req, res) => {
        const gr = GameRoom.build({
            gameId: req.body.gameid,
            ownerId: req.user.id,
            timeStarted: null,
            timeEnded: null
        });

        gr.save()
        .then(result => {
            res.send({
                success: true,
                id: result.id
            });
        })
        .catch(error => {
            res.send({
                success: false
            });
        });

    });

    app.get('/api/mygamerooms', isLoggedIn(), (req, res) => {
        GameRoom.findAll({ 
            where: { 
                ownerId: req.user.id 
            },
            include: [
                {
                    model: Game,
                    as: 'game'
                },
                {
                    model: User,
                    as: 'users'
                }
            ]
        }).then(result => {
            res.send(
                result.map( gr => GameRoom.exportObject(gr) )
            );
        });        
    });

    //

    function isLoggedIn() {
        return passport.authenticate('local-jwt', { session: false });
    }
}