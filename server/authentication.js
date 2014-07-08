var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy;
var User = require('./users/model')

module.exports = {

  init: function(app) {
    app.use(passport.initialize());
    passport.use(new BasicStrategy(
      function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (user.password != password) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ));
    app.post('/login', passport.authenticate('basic', { session: false }));
  }

}