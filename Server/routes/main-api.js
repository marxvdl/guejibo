const models = require('../sequelize/models');

const User = models.User;
const Game = models.Game;
const GameRoom = models.GameRoom;

const gamelogic = require('../app/gamelogic');
const authlogic = require('../app/authlogic');

module.exports = function (app, passport) {

    /*
     * Returns a list of all available games.
     */
    app.get('/api/games', (req, res) => {
        Game.findAll().then(result => {
            res.send(
                result.map(game => Game.exportObject(game))
            );
        });
    });

    /*
     * Returns information about a specific game.
     */
    app.get('/api/game/:id', (req, res) => {
        Game.findOne({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.send(
                Game.exportObject(result)
            );
        });
    });

    /*
     * Creates a new game room with current user as the owner.
     */
    app.post('/api/gameroom', isLoggedIn(), (req, res) => {
        const gr = GameRoom.build({
            gameId: req.body.gameid,
            ownerId: req.user.id,
            timeStarted: null,
            timeEnded: null,
            code: gamelogic.createGameRoomCode()
        });

        gr.save()
            .then(result => {
                res.send({
                    success: true,
                    id: result.id,
                    code: result.code
                });
            })
            .catch(error => {
                res.send({
                    success: false
                });
            });

    });

    /*
     * Creates a new game room with a new unregistered user as the owner.
     */
    app.post('/api/guest/gameroom/', (req, res) => {
        guestUser = User.build(
            {
                name: gamelogic.createRandomUserName(),
                temporary: true
            }
        );
        guestUser.save().then(() => {

            const gr = GameRoom.build({
                gameId: req.body.gameid,
                ownerId: guestUser.id,
                timeStarted: null,
                timeEnded: null,
                code: gamelogic.createGameRoomCode()
            });

            gr.save()
                .then(result => {
                    res.send({
                        success: true,
                        id: result.id,
                        code: result.code,
                        token: authlogic.createJWT(guestUser)
                    });
                })
                .catch(error => {
                    res.send({
                        success: false
                    });
                });
        })

    });

    /*
     * Returns a list of all game rooms owned by current user.
     */
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
                    as: 'members'
                }
            ]
        }).then(result => {
            res.send(
                result.map(gr => GameRoom.exportObject(gr))
            );
        });
    });

    /*
     * Returns data about a game room, including a full list of members.
     */
    app.get('/api/gameroom/:id', isLoggedIn(), (req, res) => {
        GameRoom.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Game,
                    as: 'game'
                },
                {
                    model: User,
                    as: 'owner'
                },
                {
                    model: User,
                    as: 'members'
                }
            ]
        })
            .then(gr => {
                res.send(GameRoom.exportObject(gr, true));
            });
    });

    //

    function isLoggedIn() {
        return passport.authenticate('local-jwt', { session: false });
    }
};