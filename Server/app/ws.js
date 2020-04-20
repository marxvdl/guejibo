const WebSocket = require('ws');
const jwt = require('jwt-simple');
const models = require('../sequelize/models');
const GameLogic = require('../app/gamelogic');

const User = models.User;
const GameRoom = models.GameRoom;
const Game = models.Game;
const UsersGameRooms = models.UsersGameRooms;


module.exports = function (app, passport) {

    //Stores the user that is currently connected on the web socket
    let currentUser = null;

    //Web socket server for this connection
    const wss = new WebSocket.Server({
        port: 8080,
        verifyClient: async (info, done) => {
            const token = info.req.url.split('/')[1];

            let decoded;
            try {
                decoded = jwt.decode(token, process.env.JWT_SECRET);
            }
            catch (e) {
                done(false);
                return;
            }

            currentUser = await User.findOne({ where: { id: decoded.id } });
            done(true);
        }
    });

    //Dictionary of web socket servers indexed by user id
    let webSocketsById = {};

    wss.on('connection', ws => {
        webSocketsById[currentUser.id] = ws;
        ws.user = currentUser;

        ws.on('message', message => {
            let data;
            try {
                data = JSON.parse(message);

                if (!data.action) {
                    ws.send("Error: missing action field");
                    return;
                }

                switch (data.action) {
                    //Waiting and joining actions
                    case 'join':
                        doActionJoin(ws, data.code);
                        return;

                    case 'im-ready':
                        doActionImReady(ws, data);
                        return;

                    case 'start-game':
                        doActionStartGame(ws, data);
                        return;

                    //In-game actions
                    case 'update-score':
                        doActionUpdateScore(ws, data);
                        return;

                    //
                    default:
                        ws.send(`Error: invalid action "${data.action}"`);
                        return;
                }

            }
            catch (e) {

                ws.send('Error: invalid data');
                return;
            }
        });
    });

    /*
     * 'join' -> Joing a game, given code.
     */
    function doActionJoin(ws, code) {
        GameRoom.findOne({
            where: {
                code: code,
                timeStarted: null
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
                gr.addMember(currentUser.get().id).then(() => {
                    ws.send(JSON.stringify(
                        {
                            responseTo: 'join',
                            success: true,
                            gameroom: GameRoom.exportObject(gr, true)
                        }
                    ));
                });
            })
            .catch(e => {
                ws.send(JSON.stringify(
                    {
                        responseTo: 'join',
                        success: false,
                        error: 'Game room not found'
                    }
                ));
            });
    }

    /*
     * 'im-ready' -> Confirm that a waiting client is ready to start playing.
     */
    function doActionImReady(ws, data) {
        GameRoom.findOne({
            where: {
                id: data.gameroom,
                timeEnded: null
            },
            include: [
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
                if (gr === null) return;

                let sendToList = gr.members.map(m => m.id).filter(id => id != ws.user.id);
                sendToList.push(gr.ownerId);

                for (let id of sendToList) {
                    webSocketsById[id].send(JSON.stringify(
                        {
                            req: 'player-is-ready',
                            user: User.exportObject(ws.user),
                            gameroom: data.gameroom
                        }
                    ));
                }
            });
    }

    /*
     * Start a new game room session.
     */
    function doActionStartGame(ws, data) {
        GameRoom.findOne({
            where: {
                id: data.gameroom
            },
            include: [
                {
                    model: User,
                    as: 'owner'
                },
                {
                    model: User,
                    as: 'members'
                },
                {
                    model: Game,
                    as: 'game'
                }
            ]
        })
            .then(gr => {
                gr.timeStarted = toMysqlFormat(new Date());
                gr.save().then(result => {
                    let sendToList = gr.members.map(m => m.id).filter(id => id != ws.user.id);
                    sendToList.push(gr.ownerId);

                    for (let id of sendToList) {
                        webSocketsById[id].send(JSON.stringify(
                            {
                                req: 'game-started',
                                gameroom: data.gameroom,
                                startTime: gr.timeStarted,
                                path: gr.game.basePath
                            }
                        ));
                    }
                });
            });

    }


    //Adapted from https://stackoverflow.com/a/5133807/641312    
    function toMysqlFormat(date) {
        function pad(d) {
            if (0 <= d && d < 10) return "0" + d.toString();
            if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
            return d.toString();
        }
        return date.getUTCFullYear() + "-" + pad(1 + date.getUTCMonth()) + "-" + pad(date.getUTCDate()) + " " + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds());
    }

    /**
     * Updates the score for an ongoing game.
     */
    function doActionUpdateScore(ws, data) {
        GameRoom.findOne({
            where: {
                id: data.gameroom
            }
        })
            .then(gr => {

                //Send new score to the client
                webSocketsById[gr.ownerId].send(JSON.stringify(
                    {
                        req: 'update-score',
                        user: ws.user.id,
                        gameroom: data.gameroom,
                        score: data.score,
                        endgame: data.endgame
                    }
                ));

                //If this player has finished, check if the game is over for everybody else
                if (data.endgame) {
                    UsersGameRooms.update(
                        { score: data.score },
                        {
                            where: {
                                userId: ws.user.id,
                                gameRoomId: data.gameroom
                            }
                        }
                    )
                        .then(n => {

                            //If all players have a defined score, then the game is over
                            UsersGameRooms.findAndCountAll({
                                where: {
                                    gameRoomId: data.gameroom,
                                    score: null
                                }
                            })
                                .then(obj => {
                                    if (obj.count === 0) {
                                        //Update the database
                                        gr.timeEnded = toMysqlFormat(new Date());
                                        gr.save().then(result => {

                                            //Send a message to the owner
                                            webSocketsById[gr.ownerId].send(JSON.stringify(
                                                {
                                                    req: 'game-over',
                                                    gameroom: data.gameroom
                                                }
                                            ));
                                        });
                                    }
                                });
                        });
                }

            });
    }
};