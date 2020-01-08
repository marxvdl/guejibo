const jwt = require("jwt-simple");
const models = require('../sequelize/models');
const User = models.User;

module.exports = function (app, passport) {

    app.get('/auth/error', (req, res) => {
        res.send({
            success: false,
            error: 'Authentication error'
        });
    });

    app.post('/auth/login', passport.authenticate('local-login',
        {
            failureRedirect: '/auth/error'
        }),
        (req, res) => {
            res.send({
                success: true,
                token: createJWT(req.user)
            });
        }
    );

    app.post('/auth/register', passport.authenticate('local-register', 
        {
            failureRedirect: '/auth/error'
        }),
        (req, res) => {
            res.send({
                success: true,
                token: createJWT(req.user)
            });
        }
    );

    app.get('/auth/profile', isLoggedIn(), (req, res) => {
        res.send(User.exportObject(req.user));
    });

    ////

    function createJWT(obj){
        return jwt.encode(User.exportObject(obj), process.env.JWT_SECRET);
    }

    function isLoggedIn() {
        return passport.authenticate('local-jwt', { session: false });
    }

};

