const models = require('../sequelize/models');
const authlogic = require('../app/authlogic');
const User = models.User;

module.exports = function (app, passport) {

    /*
     * Returns an error message.
     */
    app.get('/auth/error', (req, res) => {
        res.send({
            success: false,
            error: 'Authentication error'
        });
    });

    /*
     * Authenticates an user with email and password.
     */
    app.post('/auth/login', passport.authenticate('local-login',
        {
            failureRedirect: '/auth/error'
        }),
        (req, res) => {
            res.send({
                success: true,
                token: authlogic.createJWT(req.user)
            });
        }
    );

    /*
     * Registers a new user.
     */
    app.post('/auth/register', passport.authenticate('local-register', 
        {
            failureRedirect: '/auth/error'
        }),
        (req, res) => {
            res.send({
                success: true,
                token: authlogic.createJWT(req.user)
            });
        }
    );

    /*
     * Returns data about the current user.
     */
    app.get('/auth/profile', isLoggedIn(), (req, res) => {
        res.send(User.exportObject(req.user, true));
    });

    ////

    function isLoggedIn() {
        return passport.authenticate('local-jwt', { session: false });
    }
};

