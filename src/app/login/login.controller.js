angular
  .module('clientTodo')
  .controller('LoginController', LoginController)

  function LoginController ($rootScope, $auth, $location) {
    $rootScope.$on('auth:login-success', function(ev, user) {
      $location.path('/lists')
    });
  }
