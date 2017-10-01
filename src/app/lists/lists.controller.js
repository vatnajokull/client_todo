(function() {
  'use strict';

  angular
    .module('clientTodo')
    .controller('ListsController', function($rootScope, $scope, $state, $stateParams, List, $uibModal) {

      var vm = this;

      $scope.open = function (editedList) {
        var modalInstance = $uibModal.open({
          templateUrl: "app/lists/edit_list.view.html",
          controller: 'ModalInstanceController',
          size: 'sm',
          resolve: {
            editedList: function () {
              return editedList;
            }
          }
        });

        modalInstance.result.then(function (list) {
          vm.updateList(list);
        }, function () {
          // failure, for instance show alert, 'cancel' function
        });
      };

      $scope.newListModal = function () {
        var modalInstance = $uibModal.open({
          templateUrl: "app/lists/new_list.view.html",
          controller: 'newListModalController',
          controllerAs: 'newListCtrl',
          size: 'sm'
        });

        modalInstance.result.then(function (listName) {
          $scope.createList(listName);
        }, function () {
          // failure, for instance show alert, 'cancel' function
        });
      };


      $scope.createList = function(name) {
        var list = new List({
          name: name
        });
        list.create().then(function(){
          $scope.lists.push(list);
        });
      };

      vm.updateList = function(list) {
        list.update();
      };

      $scope.removeList = function(list) {
        var index = $scope.lists.indexOf(list);
        if (index > -1) {
          $scope.lists.splice(index, 1);
        }
        list.delete();
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

      // will get a "401 Unauthorized" if the user is not authenticated
      list_query();
    });

})();
