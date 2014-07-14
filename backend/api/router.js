/**
 * @file REST API implementation - Handlers for API urls.
 */

var express    = require('express');
var Model = require('./models/model');
var modelCtrl = require('./controllers/model');


/**
 * Provides an Express router instance with PassportJs support enabled.
 * @param  {Object} passport A configured PassportJs instance.
 * @return {express.Router} An express.Router instance.
 */
var provideRouter = function(passport) {

  var router = express.Router();

  /**
   * Middleware for checking if the user is logged in.
   * TODO(devnook): Where to dedupe this?
   */
	var authenticate = function(req, res, next) {
	  if (!req.isAuthenticated()) {
	    res.send(401)
	  } else {
	    next();
	  }
	};

  /**
   * Handling Model resource.
   */
	router.route('/model')
		.post(modelCtrl.add)
		.get(modelCtrl.list);
	router.route('/model/:model_id')
		.get(modelCtrl.getById)
    .put(modelCtrl.save)
		.delete(authenticate, modelCtrl.delete);
  return router;
}

module.exports = provideRouter;