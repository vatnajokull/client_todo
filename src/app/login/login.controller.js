angular
  .module('clientTodo')
  .controller('LoginController', LoginController)

  function LoginController ($rootScope, $auth, $location, $cookies, $mdToast) {
    var vm = this;   

    function showNotification(textNotification) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(textNotification)
          .position('top right' )
          .hideDelay(1500)
      );
    }

    $rootScope.$on('auth:login-success', function(ev, user) {
      showNotification('Welcome back ' + user.email)
      $location.path('/lists')
    });

    $rootScope.$on('auth:login-error', function(ev, reason) {
      console.log('auth login-error');
      angular.forEach(reason.errors, function(value, index) {
        showNotification(value)  
      })      
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
