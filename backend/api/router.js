/**
 * @file REST API implementation - Handlers for API urls.
 */

var express    = require('express');
var Model = require('./models/model');


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
	  /**
	   * Create a new Model.
	   */
		.post(function(req, res) {
			var model = new Model();
	 		model.name = req.body.name;
			model.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'model created!' });
			});
		})
		/**
	   * List Models.
	   */
		.get(function(req, res) {
			Model.find(function(err, models) {
				if (err) {
					res.send(err);
				}
				res.json(models)
			})
		});
	router.route('/model/:model_id')
	  /**
	   * Get Model by id.
	   */
		.get(function(req, res) {
			Model.findById(req.params.model_id, function(err, model) {
				if (err) {
					res.send(err);
				}
				res.json(model);
			});
		})
		/**
	   * Update a Model.
	   */
    .put(function(req, res) {
  		Model.findById(req.params.model_id, function(err, model) {
				if (err) {
					res.send(err);
				}
				model.name = req.body.name;
				model.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json({ message: 'Model updated!' });
				});
			});
		})
    /**
	   * Delete a Model. Requires authentication.
	   */
		.delete(authenticate, function(req, res) {
			Model.remove({
				_id: req.params.model_id
			}, function(err, model) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'Successfully deleted' });
			});
		});

  return router;
}

module.exports = provideRouter;