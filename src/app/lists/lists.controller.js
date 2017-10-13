(function() {
  'use strict';

  angular
    .module('clientTodo')
    .controller('ListsController', function($rootScope, $scope, List, $mdDialog, $mdExpansionPanel, $mdToast) {

      var vm = this;
      vm.newList = {};
      vm.editedList = null;

      vm.getLists = getLists;            
      vm.createList = createList;
      vm.resetForm = resetForm;
      vm.showAlertRemoveList = showAlertRemoveList;
      vm.editList = editList;
      vm.updateList = updateList;
      vm.cancelEdit = cancelEdit;

      function createList(newList, form) {
         console.log('-> triggered createList');
        if (form.$valid) {
          var list = new List({
            name: newList.name
          });
          list.create().then(function(){
            $scope.lists.push(list);
            resetForm(form);                        
          }, function(response){
            showServerValidationErrors(response);
          })
        }       
      }

      function showServerValidationErrors(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('This name ' + response.data.name[0])
            .position('top right' )
            .hideDelay(1500)
          );                   
        }

      function resetForm(form) {        
        console.log('in resetForm');
        form.listName.$setValidity('required', true)
        form.$setUntouched();
        form.$setPristine();               
        $scope.showButtons = false;
        vm.newList = null;     
      }

      function editList (list) {
        vm.editedList = angular.copy(list);
      }

      function updateList (list, name, form) {
        console.log('in update');
        list.name = name;
        list.update().then(function () {
          cancelEdit(form);
        });
      }

      function cancelEdit (form) {
        console.log('in cancelEdit');
        form.$setUntouched();
        form.$setPristine();
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

      function getLists() {
        console.log('in getLists function');
        List.query().then(function(lists){
          $scope.lists = lists;
        });
      }

      // when the user logs in, fetch the posts
      // $rootScope.$on('auth:login-success', function(ev, user) {
      //   list_query();
      // });

      // will get a "401 Unauthorized" if the user is not authenticated
      // list_query();
    });

})();
