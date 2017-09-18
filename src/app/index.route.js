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
      .state('lists', {
        url: '/lists',
        templateUrl: 'app/lists/lists.html',
        controller: 'ListsController',
        controllerAs: 'lists'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
