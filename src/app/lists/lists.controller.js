(function() {
  'use strict';

  angular
    .module('clientTodo')
    .controller('ListsController', function($rootScope, $scope, $state, $stateParams, List) {

      // var vm = this;

      // method to query the posts api and store the results in $scope
      // note: the linter will complain, but that can be fixed later:
      // You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"

      $scope.createList = function(listName) {
        var list = new List({
          name: listName
        });
        $scope.lists.push(list);
        $scope.listName = '';
        list.create();
      };

      $scope.removeList = function(list) {
        var index = $scope.lists.indexOf(list);
        if (index > -1) {
          $scope.lists.splice(index, 1);
        }
        list.delete();
      };

      $scope.updateList = function(list, name) {
        list.name = name;
        $scope.editedList = null;
        list.update();
      };

      $scope.editList = function(list) {
        $scope.editedListName = list.name;
        $scope.editedList = list;
      };

      $scope.cancelEdit = function(event) {
        if (event.which === 27) {
          $scope.editedList = null;
          $scope.editedListName = '';
        }
      };

      var list_query = function(){
        List.query().then(function(lists){
          $scope.lists = lists;
        });
      };

      // when the user logs in, fetch the posts
      $rootScope.$on('auth:login-success', function(ev, user) {
        list_query();
      });

      // when the user logs out, remove the posts
      $rootScope.$on('auth:logout-success', function(ev) {
        $scope.lists = null;
      });

      // will get a "401 Unauthorized" if the user is not authenticated
      list_query();
    });

})();
