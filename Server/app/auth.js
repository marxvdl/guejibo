const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt-nodejs');
const models = require('../sequelize/models');
const User = models.User;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function (passport) {

  passport.serializeUser((user, done) => {
    done(null, user.get().id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id: id } })
      .then((user) => { done(null, user); });
  });

  passport.use(
    'local-register',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
      (req, email, password, done) => {

        let returnFunction = user => done(null, user);

        if ('id' in req.body) {
          completeRegistration(req, email, password, returnFunction);
        }
        else {
          registerNewUser(req, email, password, returnFunction);
        }



      })
  );

  function completeRegistration(req, email, password, returnFunction) {
    User.findOne({ where: { id: req.body.id, temporary: true } })
      .then(
        existingUser => {
          if (existingUser === null) {
            return done(null, false);
          }
          else {
            existingUser.name = req.body.name;
            existingUser.email = email;
            existingUser.password = bcrypt.hashSync(password, null, null);
            existingUser.temporary = false;

            existingUser.save()
              .then(returnFunction);
          }
        }
      );
  }

  function registerNewUser(req, email, password, returnFunction) {
    User.findOne({ where: { email: email } })
      .then(
        user => {
          if (user === null) {
            User.create(
              {
                name: req.body.name,
                email: email,
                password: bcrypt.hashSync(password, null, null)
              }
            )
              .then(returnFunction);
          }
          else {
            return done(null, false);
          }
        }
      );
  }

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
              return done(null, false);
            }
            else {
              if (bcrypt.compareSync(password, user.get().password))
                return done(null, user);
              else
                return done(null, false);
            }
          });
      })
  );

  passport.use(
    'local-jwt',
    new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
      (jwtPayload, done) => {
        return done(null, jwtPayload);
      }
    ));
};