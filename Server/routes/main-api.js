const models = require('../sequelize/models');

const User = models.User;
const Game = models.Game;
const GameRoom = models.GameRoom;

const GameLogic = require('../app/gamelogic');

module.exports = function (app, passport) {

    /*
     * Returns a list of all available games.
     */
    app.get('/api/games', isLoggedIn(), (req, res) => {
        Game.findAll().then(result => {
            res.send(
                result.map(game => Game.exportObject(game))
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
            code: GameLogic.createGameRoomCode()
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
     * Joins a game room using a code.
     */
    app.get('/api/join', isLoggedIn(), (req, res) => {
        GameRoom.findOne({
            where: {
                code: req.body.code,
                timeStarted: null
            }
        })
        .then(gr => {
            gr.addMember(req.user.id).then(user_gr => {
                res.send({
                    success: true
                });
            });
        })
        .catch(e => {
            console.log(e);
            res.send({
                success: false,
                error: 'Game room not found'
            })
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
            res.send( GameRoom.exportObject(gr, true) );
        });
    });

    //

    function isLoggedIn() {
        return passport.authenticate('local-jwt', { session: false });
    }
}