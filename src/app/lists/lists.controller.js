(function() {
  'use strict';

  angular
    .module('clientTodo')
    .controller('ListsController', function($rootScope, $scope, $state, $stateParams, List, $uibModal) {

      var vm = this;

      // method to query the posts api and store the results in $scope
      // note: the linter will complain, but that can be fixed later:
      // You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"

      $scope.open = function (editedList) {
        var modalInstance = $uibModal.open({
          templateUrl: "app/lists/edit_list.template.html",
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

      $scope.createList = function(newListForm) {
        var list = new List({
          name: newListForm.name
        });
        $scope.lists.push(list);
        newListForm.name = '';
        list.create();
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

      // when the user logs out, remove the posts
      $rootScope.$on('auth:logout-success', function(ev) {
        $scope.lists = null;
      });

      // will get a "401 Unauthorized" if the user is not authenticated
      list_query();
    });

})();
