/**
 * @file REST API implementation - Handlers for API urls.
 */

var express    = require('express');
var Model = require('../models/model');


/**
 * Provides an Express router instance with PassportJs support enabled.
 * @param  {Object} passport A configured PassportJs instance.
 * @return {express.Router} An express.Router instance.
 */
var ModelController = function() {
	return {
		list: function(req, res) {
			Model.find(function(err, models) {
				if (err) {
					res.send(err);
				}
				res.json(models)
			})
		},
		add: function(req, res) {
			var model = new Model();
	 		model.name = req.body.name;
			model.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'model created!' });
			});
		},
		getById: function(req, res) {
			Model.findById(req.params.model_id, function(err, model) {
				if (err) {
					res.send(err);
				}
				res.json(model);
			});
		},
		save: function(req, res) {
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
		},
		delete: function(req, res) {
			Model.remove({
				_id: req.params.model_id
			}, function(err, model) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'Successfully deleted' });
			});
		}

	} // End return.


}

module.exports = new ModelController();