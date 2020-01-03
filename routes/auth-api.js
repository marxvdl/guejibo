module.exports = function (app, passport) {

    app.get('/auth/error', (req, res) => {
        res.send({ error: "Authentication error"});
    });

    app.post('/auth/login', passport.authenticate('local-login', {
        successRedirect: '/auth/profile',
        failureRedirect: '/auth/error',
        failureFlash: true
    }),
        function (req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    app.post('/auth/register', passport.authenticate('local-register', {
        successRedirect: '/auth/profile',
        failureRedirect: '/auth/error',
        failureFlash: true
    }));

    app.get('/auth/profile', isLoggedIn, (req, res) => {
        res.send(req.user);
    });

    app.get('/auth/logout', (req, res)  => {
        req.logout();
        res.redirect('/');
    })

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }

};

