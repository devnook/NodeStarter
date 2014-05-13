'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, element, attrs) {
      element.text(version);
    };
  }])
  .directive('user', ['AuthService', function(AuthService) {
    return {
      restrict: 'E',
      templateUrl: 'partials/user.html',
      scope: {},
      controller: function($scope) {
        $scope.$watch( AuthService.isLoggedIn, function ( isLoggedIn ) {
          $scope.isLoggedIn = isLoggedIn;
          $scope.currentUser = AuthService.currentUser();
        });
        $scope.currentUser = AuthService.currentUser();

        $scope.login = function() {
          AuthService.login($scope.user);
        };

        $scope.logout = function() {
          AuthService.logout();
        };

        $scope.signup = function() {
          AuthService.signup($scope.newUser);
        };

        $scope.facebook = function() {
          AuthService.facebookLogin();
        };

        $scope.google = function() {
          AuthService.googleLogin();
        };
      }
    };
  }]);
