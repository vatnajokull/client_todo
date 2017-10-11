(function() {
  'use strict';

  angular
    .module('clientTodo')
    .controller('ListsController', function($rootScope, $scope, List, $mdDialog, $mdExpansionPanel) {

      var vm = this;
      var newListForm = {}

      vm.editedList = null;

      vm.createList = createList;
      vm.resetForm = resetForm;
      vm.showAlertRemoveList = showAlertRemoveList;
      vm.editList = editList;
      vm.updateList = updateList;
      vm.cancelEdit = cancelEdit;

      function createList(form) {
        console.log('-> triggered createList');
        var list = new List({
          name: form.name
        });
        list.create().then(function(){
          $scope.lists.push(list);
          resetForm(form);
        });
      }

      function resetForm (form) {
        console.log('in resetForm');
        $scope.showButtons = false;
        form.$setUntouched();
        form.$setPristine();
        form.name = ''
      }

      function editList (list) {
        vm.editedList = angular.copy(list);
      }

      function updateList (list, name) {
        console.log('in update');
        list.name = name;
        list.update().then(function () {
          cancelEdit();
        });
      }

      function cancelEdit () {
        console.log('in cancelEdit');

        vm.editedList = null;
      }

      function removeList (list) {
        var index = $scope.lists.indexOf(list);
        if (index > -1) {
          $scope.lists.splice(index, 1);
        }
        list.delete();
      };

      function showAlertRemoveList(list, ev) {
        var confirm = $mdDialog.confirm()
              .title('Delete list?')
              .textContent('Do you really want to delete "' + list.name + '" ?')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Delete')
              .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
          removeList(list);
        }, function() {
          // $scope.status = 'You decided to keep your debt.';
        });
      };

      var list_query = function(){
        console.log('in list_query function');
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
