angular
  .module('clientTodo')
  .controller('MainController', MainController);

  function MainController($location, $rootScope, $cookies, $scope, $auth) {
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
