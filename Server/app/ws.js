const WebSocket = require('ws');
const jwt = require('jwt-simple');
const base64url = require("base64url");
const models = require('../sequelize/models');
const gamelogic = require('../app/gamelogic');
const authlogic = require('../app/authlogic');

const User = models.User;
const GameRoom = models.GameRoom;
const Game = models.Game;
const UsersGameRooms = models.UsersGameRooms;


module.exports = function (app, httpServer, passport) {

    //Stores the user that is currently connected on the web socket
    let currentUser = null;

    //Web socket server for this connection
    const wss = new WebSocket.Server({
        server: httpServer,
        verifyClient: async (info, done) => {
            const token = info.req.url.split('/')[1];

            //Unregisterd user
            if (token.startsWith('unregistered_')) {
                let name = base64url.decode(token.substr(13));
                if (name === '') {
                    name = gamelogic.createRandomUserName();
                }

                currentUser = User.build(
                    {
                        name: name,
                        temporary: true
                    }
                );
                await currentUser.save();
            }

            //Registered user
            else {
                let decoded;
                try {
                    decoded = jwt.decode(token, process.env.JWT_SECRET);
                }
                catch (e) {
                    done(false);
                    return;
                }

                currentUser = await User.findOne({ where: { id: decoded.id } });
            }

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

                    case 'end-game':
                        doActionEndGame(ws, data);
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
                    let sendToList = gr.members.filter(m => m.id != ws.user.id);
                    sendToList.push(gr.owner);

                    for (let user of sendToList) {
                        webSocketsById[user.id].send(JSON.stringify(
                            {
                                req: 'game-started',
                                gameroom: data.gameroom,
                                startTime: gr.timeStarted,
                                path: gr.game.basePath,
                                token: authlogic.createJWT(user)
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

                //Send new score to the game room owner
                webSocketsById[gr.ownerId].send(JSON.stringify(
                    {
                        req: 'update-score',
                        user: ws.user.id,
                        gameroom: data.gameroom,
                        score: data.score,
                        endgame: data.endgame
                    }
                ));

                //Update database with new score and endgame status
                UsersGameRooms.update(
                    {
                        score: data.score,
                        ended: data.endgame
                    },
                    {
                        where: {
                            userId: ws.user.id,
                            gameRoomId: data.gameroom,
                            ended: false
                        }
                    }
                )
                    .then(n => {
                        //If this player has finished...
                        if (data.endgame) {          

                            //... send a confirmation message ...
                            webSocketsById[ws.user.id].send(JSON.stringify(
                                {
                                    req: 'user-game-over',
                                    user: User.exportObject(ws.user),
                                    gameroom: data.gameroom,
                                    score: data.score
                                }
                            ));                            
                            
                            //... and check if the game is also over for everybody else
                            UsersGameRooms.findAndCountAll({
                                where: {
                                    gameRoomId: data.gameroom,
                                    ended: false
                                }
                            })
                                .then(obj => {
                                    if (obj.count === 0) {
                                        wrapUpGameRoom(gr);
                                    }
                                });
                        }

                    });
            });
    }

    /**
     * Forces an ongoing game to end prematurely.
     */
    function doActionEndGame(ws, data) {
        UsersGameRooms.update(
            { ended: true },
            { where: { gameRoomId: data.gameroom } }
        )
            .then(n => {
                GameRoom.findOne(
                    { where: { id: data.gameroom } }
                )
                    .then(gr => {
                        wrapUpGameRoom(gr);
                    });
            });
    }

    /**
     * Udpdates the database and send the owner a message to indicate that
     * the game is over for a game room.
     */
    function wrapUpGameRoom(gr) {
        gr.timeEnded = toMysqlFormat(new Date());
        gr.save().then(result => {
            webSocketsById[gr.ownerId].send(JSON.stringify(
                {
                    req: 'game-over',
                    gameroom: gr.id,
                    endTime: gr.timeEnded
                }
            ));
        });
    }
};