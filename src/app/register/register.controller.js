angular
  .module('clientTodo')
  .controller('RegisterController', RegisterController)

  function RegisterController ($rootScope, $scope, $auth, $location) {
    var vm = this;

    $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };

    $scope.$on('auth:registration-email-success', function(ev, message) {
      $location.path('/lists')
    });

    $scope.$on('auth:registration-email-error', function(ev, reason) {
      vm.registerErrors = angular.copy(reason.errors);
    });
  }
