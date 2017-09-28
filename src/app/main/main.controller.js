angular
  .module('clientTodo')
  .controller('MainController', MainController);

  function MainController($location, $rootScope, $timeout, $cookies, $scope, $auth) {
    // var vm = this;

    // when the user logs out, remove the posts
    $rootScope.$on('auth:logout-success', function(ev) {
      $location.path('/')
    });

    function checkUser() {
      if (!!$cookies.get('auth_headers')) {
        $location.path('/lists');
      } else {
        $location.path('/');
      }
    }

    checkUser();
  }
