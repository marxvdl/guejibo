const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt-nodejs');
const models = require('../sequelize/models');
const User = models.User;

module.exports = function (passport) {

  passport.serializeUser((user, done) => {
    done(null, user.get().id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id: id } })
        .then( (user) => { done(null, user) } );
  });

  passport.use(
    'local-register',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
      (req, email, password, done) => {
        User.findOne({ where: { email: email } })
            .then( 
              (user) => {
                if(user === null){
                  
                  User.create(
                    {
                      name: req.body.name,
                      email: email,
                      password: bcrypt.hashSync(password, null, null)
                    }
                  )
                  .then(
                    (user) => {
                      return done(null, user);
                    }
                  );

                }
                else {
                  return done(null, false, req.flash('auth-error', "E-mail already registered"));
                }

              }
            )
      })
  );

  passport.use(
    'local-login',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
      (req, email, password, done) => {
        User.findOne({ where: { email: email } })
          .then((user) => {

            const errorMsg = 'Invalid credentials';
            if (user === null) {
              return done(null, false, req.flash('auth-error', errorMsg));
            }
            else {
              if (bcrypt.compareSync(password, user.get().password))
                return done(null, user);
              else
                return done(null, false, req.flash('auth-error', errorMsg));
            }
          });
      })
  );
};