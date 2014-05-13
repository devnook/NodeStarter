'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', '$httpProvider', function(
    $routeProvider, $httpProvider) {

  /**
   * Routes.
   */
  $routeProvider.when('/model', {
    templateUrl: 'partials/model_list.html',
    controller: 'ModelListCtrl'
  });
  $routeProvider.when('/model/:modelId', {
    templateUrl: 'partials/model_detail.html',
    controller: 'ModelDetailCtrl'
  });
  $routeProvider.when('/sample-view', {
      templateUrl: 'partials/sample_view.html',
      controller: 'SampleCtrl'
  });
  $routeProvider.when('/login', {
      templateUrl: 'partials/login.html'
  });
  $routeProvider.otherwise({redirectTo: '/model'});

  /**
   * Request middleware.
   */
  $httpProvider.interceptors.push(function($q, $location) {
    return {
      'responseError': function(rejection) {
        if (rejection.status === 401) {
          $location.url('/login');
        }
        return $q.reject(rejection);
      }
    };
  });

}]);


