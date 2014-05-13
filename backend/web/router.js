/**
 * @file Handlers for serving static web pages, usually bootstrap for the app.
 */

var express    = require('express');

var provideRouter = function(passport) {

  var router = express.Router();

  /**
   * Example middleware for web requests.
   */
  router.use(function(req, res, next) {
  	// Do something.
  	console.log('Something is happening.');
  	next();
  });

  router.get('/', function(req, res) {
    res.render('index.html', { title: 'Express' });
  });

  return router;
}

module.exports = provideRouter;
