const WebSocket = require('ws');
const jwt = require('jwt-simple');
const models = require('../sequelize/models');
const User = models.User;

module.exports = function (app, passport) {

    const wss = new WebSocket.Server({
        port: 8080,
        verifyClient: async (info, done) => {
            const token = info.req.url.split('/')[1];

            let decoded;
            try{
                decoded = jwt.decode(token, process.env.JWT_SECRET);    
            }
            catch(e){                
                console.log('Invalid token!');
                done(false);
                return;
            }            

            let user = await User.findOne({where: {id: decoded.id }});
            done(user);
        }
    });

    wss.on('connection', ws => {
        ws.on('message', message => {
            console.log(`Recebido ${message}`);
            ws.send('Você disse: ' + message);

            let data;
            try {
                data = JSON.parse(message);
            }
            catch(e){
                ws.send('error');
                return;
            }

            console.log(data);
        });
    });

};