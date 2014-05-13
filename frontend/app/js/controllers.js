'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('ModelListCtrl', ['$scope', 'Model', function($scope, Model) {
    $scope.models = Model.query();
  }])

  .controller('ModelDetailCtrl', ['$scope', '$routeParams', 'Model', function($scope, $routeParams, Model) {
    $scope.model = Model.get({modelId: $routeParams.modelId}, function(model) {
      console.log('Retrieved: ', model)
    });

    $scope.delete = function() {
      $scope.model.$delete({modelId: $scope.model._id});
    }
  }])

  .controller('SampleCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/auth'); // This should redirect to /#/login if not logged in.
  }]);
