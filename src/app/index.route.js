(function() {
  'use strict';

  angular
    .module('clientTodo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/login/login.view.html',
        controllerAs: 'vm'
      })
      .state('register', {
          url: '/register',
          controller: 'RegisterController',
          templateUrl: 'app/register/register.view.html',
          controllerAs: 'vm'
      })
      .state('lists', {
        url: '/lists',
        templateUrl: 'app/lists/lists.view.html',
        controller: 'ListsController',
        controllerAs: 'lists',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
