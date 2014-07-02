var passport = require('passport');

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
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ));
    app.post('/login', passport.authenticate('local'));
  }

}