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

    function showNotification(textNotification) {      
      $mdToast.show(
        $mdToast.simple()
          .textContent(textNotification)
          .position('top right' )
          .hideDelay(1500)
      );
    }

    $scope.$on('auth:registration-email-success', function(ev, message) {
      showNotification("Well done! You've successfully registered.")
      $location.path('/lists')
    });

    $scope.$on('auth:registration-email-error', function(ev, reason) {
      console.log('auth:registration-email-error');
      angular.forEach(reason.errors.full_messages, function(value, index) {
        showNotification(value)
      })       
    });
  }
