const express = require('express');
const path = require('path');
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
            .then(gameRoomResult => {
                Game.findOne({
                    where: {
                        id: req.body.gameid
                    }
                }).then(gameResult => {
                    res.send({
                        success: true,
                        id: gameRoomResult.id,
                        game: Game.exportObject(gameResult),
                        code: gameRoomResult.code
                    });
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
        User.create(
            {
                name: gamelogic.createRandomUserName(),
                temporary: true
            }
        )
            .then(guestUser => {
                GameRoom.create({
                    gameId: req.body.gameid,
                    ownerId: guestUser.id,
                    timeStarted: null,
                    timeEnded: null,
                    code: gamelogic.createGameRoomCode()
                })
                    .then(gameRoomResult => {
                        Game.findOne({
                            where: {
                                id: req.body.gameid
                            }
                        }).then(gameResult => {
                            res.send({
                                success: true,
                                id: gameRoomResult.id,
                                game: Game.exportObject(gameResult),
                                code: gameRoomResult.code,
                                token: authlogic.createJWT(guestUser)
                            });
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

    /*
     * All other routes are redirected to the Angular client.
     */
    app.use(express.static('client'));
    app.get('/*', (req, res, next) => {
        if (req.url.startsWith('/games')) {
            res.sendFile(
                'G'+req.url.substr(2),
                { root: path.join(__dirname, '../..') },
                err => {
                    if (err) {
                        if (err.code == 'EISDIR')
                            res.redirect(req.url + '/');
                        else
                            next(err);
                    }
                }
            );
        }
        else {
            res.sendFile('client/index.html', { root: path.join(__dirname, '..') });
        }
    });

    //    
    function isLoggedIn() {
        return passport.authenticate('local-jwt', { session: false });
    }
};