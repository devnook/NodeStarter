var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var User = require('../models/user');

// TODO(devnook): These seem out of place. Move to server.js?
var FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
var FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
var HOST = process.env.HOST;
var PORT = process.env.PORT || 3000;
var GOOGLE_CALLBACK_PATH = '/auth/google/callback';
var FACEBOOK_CALLBACK_PATH = '/auth/facebook/callback';

/**
 * Configures passport.js with authorization strategies.
 * @param  {Object} passport Passport instance.
 */
module.exports = function(passport) {

  /**
   * Serialization for sessions.
   */
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  /**
   * Configure Google login strategy.
   */
  passport.use(new GoogleStrategy({
    returnURL: HOST + ':' + PORT + GOOGLE_CALLBACK_PATH,
    realm: HOST + ':' + PORT
  },
  function(identifier, profile, done) {
    User.findOne({ 'google.openId': identifier }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      } else {
        var newUser = new User();
        newUser.google.openId = identifier;
        newUser.google.name = profile.displayName;
        newUser.google.email = profile.emails[0].value;
        newUser.profile.displayName = profile.displayName;
        newUser.profile.email = profile.emails[0].value;
        newUser.save(function(err) {
          if (err) {
            throw err;
          }
          return done(null, newUser);
        });
      }
    });
  }));

  /**
   * Configure Facobook login strategy.
   */
  passport.use('facebook', new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: HOST + ':' + PORT + FACEBOOK_CALLBACK_PATH
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'facebook.id': profile.id }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      } else {
        var newUser = new User();
        newUser.facebook.id    = profile.id;
        newUser.facebook.name = profile.displayName;
        newUser.profile.displayName = profile.displayName;
        newUser.save(function(err) {
            if (err)
                throw err;
            return done(null, newUser);
        });
      }
    });
  }));

  /**
   * Configure local signup strategy with email and password.
   */
  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
  },
  function(email, password, done) {
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, { message: 'Eail already taken.' });
      } else {
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);
        newUser.profile.displayName = email;
        newUser.profile.email = email;
        newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
        });
      }
    });
  }));

  /**
   * Configure local login strategy with email and password.
   */
  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
  },
  function(email, password, done) {
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'User not found.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }));
};
