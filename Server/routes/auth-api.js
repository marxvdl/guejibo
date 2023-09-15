const models = require('../sequelize/models');
const authlogic = require('../app/authlogic');
const User = models.User;
const session = require('express-session');
require('dotenv').config();

module.exports = function (app, passport) {

    /*
     * Google OAuth 2.0 configurations.
     */

    const GoogleStrategy = require('passport-google-oauth20').Strategy;

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        function (accessToken, refreshToken, profile, cb) {
            let userEmail = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
            User.findOrCreate({
                where: { googleId: profile.id },
                defaults: {
                    name: profile.displayName,
                    email: userEmail
                }
            }).then(([user, created]) => {
                return cb(null, user);
            }).catch(err => {
                return cb(err);
            });
        }
    ));

    /*
     * Recieves profile and email from Google.
     */
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }
        )
    );
    /*
     * Authenticates with Google Account.
     */ 
    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: 'auth/login' }),
        function (req, res) {
            const user = req.user.get();
            const token = authlogic.createJWT({ id: user.id, name: user.name, email: user.email });
            res.redirect(`http://localhost:4200?token=${token}&user=${user.name}`);
        });


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

