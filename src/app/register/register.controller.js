angular
  .module('clientTodo')
  .controller('RegisterController', RegisterController)

  function RegisterController ($rootScope, $scope, $auth, $location, $mdToast) {
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
      $mdToast.show(
        $mdToast.simple()
          .textContent("Well done! You've successfully registered.")
          .position('top right' )
          .hideDelay(1500)
      );
      $location.path('/lists')
    });

    $scope.$on('auth:registration-email-error', function(ev, reason) {
      vm.registerErrors = angular.copy(reason.errors);
      console.log('true/false ' + vm.registerErrors.email);
      console.log(vm.registerErrors.email[0]);
    });
  }
