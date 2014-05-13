/**
 * @file Handlers for authentication urls.
 */

var express = require('express');  // Express framework.

/**
 * Provides an Express router instance with PassportJs support enabled.
 * @param  {Object} passport A configured PassportJs instance.
 * @return {express.Router} An express.Router instance.
 */
var provideRouter = function(passport) {

	var router = express.Router();

  /**
   * Middleware for checking if the user is logged in.
   */
	var authenticate = function(req, res, next) {
	  if (!req.isAuthenticated()) {
	    res.send(401)
	  } else {
	    next();
	  }
	};

  /**
   * Endpoint for fetching currently logged in user.
   */
	router.get('/', authenticate, function(req, res) {
		res.json(req.user);
	});

  /**
   * Endpoints for OpenId authentication via Google.
   */
  router.get('/google/login', passport.authenticate('google'));
  router.get('/google/callback', passport.authenticate('google'),
  	  function(req, res) {
    res.render('auth');
  });

  /**
   * Endpoints for OAuth authentication via Facebook.
   */
  router.get('/facebook/login', passport.authenticate('facebook'));
  router.get('/facebook/callback', passport.authenticate('facebook'),
  	  function(req, res) {
    res.render('auth');
  });

  /**
   * Endpoints for authentication via username and password.
   */
  router.post('/login', passport.authenticate('local-login'),
  	  function(req, res) {
    res.json(req.user);
  });
  router.post('/signup', passport.authenticate('local-signup'),
  	function(req, res) {
    res.json(req.user);
  });

  /**
   * Endpoint for logging out the current user.
   */
  router.post('/logout', function(req, res) {
    req.logout();
    res.send(200);
  });

  return router;
};

module.exports = provideRouter;