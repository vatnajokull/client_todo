(function() {
  'use strict';

  angular
    .module('clientTodo')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($auth, $rootScope, $location) {
      var vm = this;

      vm.handleSignOutBtnClick = function() {
        $auth.signOut()
          .then(function(resp) {

          })
          .catch(function(resp) {
            // handle error response
          });
      };

      $rootScope.$on('auth:logout-success', function(ev) {
        $location.path('/login')
      });
    }
  }

})();
