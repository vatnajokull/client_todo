angular
  .module('clientTodo')
  .controller('LoginController', LoginController)

  function LoginController ($rootScope, $auth, $location) {
    var vm = this;
    var loginError = '';

    $rootScope.$on('auth:login-success', function(ev, user) {
      $location.path('/lists')
    });

    $rootScope.$on('auth:login-error', function(ev, reason) {
      vm.loginError = reason.errors[0];
    });
  }
