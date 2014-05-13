'use strict';

/* Services */

angular.module('myApp.services', ['ngResource']).
  value('version', '0.1')
  /**
   * Provides $resource interface for Model resource in the REST API.
   * @return {Model} Model resource inteface.
   */
  .factory('Model', [
    '$resource',
    function($resource){
      return $resource('api/model/:modelId', {modelId: '@id'});
    }
  ])
  /**
   * Service for authorizing users in the app.
   * @return {AuthService} Authentication service.
   * @method login
   * @method logout
   * @method signup
   * @method googleLogin
   * @method facebookLogin
   * @method currentUser
   * @method isLoggedIn
   */
  .factory( 'AuthService', ['$http', '$window', function($http, $window) {
    var currentUser;
    var isLoggedIn = undefined;
    var loading = false;

    var fetchCurrentUser = function() {
      loading = true;
      $http.get('/auth/').success(function(data, status) {
        loading = false;
        if (status === 200) {
          currentUser = data;
          isLoggedIn = true;
        }
      });
    };
    window.addEventListener('facebook-login-success', fetchCurrentUser);

    return {
      login: function(user) {
        loading = true;
        $http.post('/auth/login', user).success(function(data) {
          loading = false;
          currentUser = data;
          isLoggedIn = true;
        })
      },
      logout: function() {
        loading = true;
        $http.post('/auth/logout').success(function(data) {
          loading = false;
          currentUser = null;
          isLoggedIn = false;
        });
      },
      signup: function(user) {
        $http.post('/auth/signup', user).success(function(data) {
          currentUser = data;
          isLoggedIn = true;
        });
      },
      facebookLogin: function() {
        var url = '/auth/facebook/login',
            width = 1000,
            height = 650,
            top = (window.outerHeight - height) / 2,
            left = (window.outerWidth - width) / 2;
        var popup = $window.open(url, 'facebook_login',
          'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
      },
      googleLogin: function() {
        var url = '/auth/google/login',
            width = 1000,
            height = 650,
            top = (window.outerHeight - height) / 2,
            left = (window.outerWidth - width) / 2;
        var popup = $window.open(url, 'google_login',
          'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
        popup.focus();
      },
      isLoggedIn: function() { return isLoggedIn; },
      currentUser: function() {
        if (!currentUser && isLoggedIn === undefined && !loading) {
          fetchCurrentUser();
        }
        return currentUser;
      }
    };
  }]);
