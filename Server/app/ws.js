const WebSocket = require('ws');
const jwt = require('jwt-simple');
const models = require('../sequelize/models');
const User = models.User;
const GameRoom = models.GameRoom;

module.exports = function (app, passport) {

    let currentUser = null;

    const wss = new WebSocket.Server({
        port: 8080,
        verifyClient: async (info, done) => {
            const token = info.req.url.split('/')[1];

            let decoded;
            try {
                decoded = jwt.decode(token, process.env.JWT_SECRET);
            }
            catch (e) {
                console.log('Invalid token!');
                done(false);
                return;
            }

            currentUser = await User.findOne({ where: { id: decoded.id } });
            done(true);
        }
    });

    wss.on('connection', ws => {
        ws.on('message', message => {
            console.log(`Recebido ${message}`);         
            ws.send('Você disse: ' + message);

            let data;
            try {
                data = JSON.parse(message);

                if (!data.action) {
                    ws.send("Error: missing action field");
                    return;
                }

                switch (data.action) {
                    case 'join':
                        doActionJoin(ws, data.code);
                        return;

                    default:
                        ws.send(`Error: invalid action "${data.action}"`)
                        return;
                }

            }
            catch (e) {
                ws.send('Error: invalid data');
                return;
            }

            console.log(data);
        });
    });

    function doActionJoin(ws, code) {
        GameRoom.findOne({
            where: {
                code: code,
                timeStarted: null
            }
        })
        .then(gr => {
            gr.addMember(currentUser.get().id).then(() => {
                ws.send(JSON.stringify({
                    success: true
                }));
            });
        })
        .catch(e => {
            console.log(e);
            ws.send(JSON.stringify({
                success: false,
                error: 'Game room not found'
            }))
        });
    }
};