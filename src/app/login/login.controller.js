angular
  .module('clientTodo')
  .controller('LoginController', LoginController)

  function LoginController ($rootScope, $auth, $location, $cookies, $mdToast) {
    var vm = this;
    var loginError = '';

    $rootScope.$on('auth:login-success', function(ev, user) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Welcome back ' + user.email)
          .position('top right' )
          .hideDelay(1500)
      );
      $location.path('/lists')
    });

    $rootScope.$on('auth:login-error', function(ev, reason) {
      vm.loginError = reason.errors[0];
    });

    function checkUser() {
      if (!!$cookies.get('auth_headers')) {        
        $location.path('/lists');
      } else {
        $location.path('/login');
      }
    }

    checkUser();
  }
