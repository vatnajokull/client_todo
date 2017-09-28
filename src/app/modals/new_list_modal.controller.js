angular
  .module('clientTodo')
  .controller('newListModalController', newListModalController)

  function newListModalController($uibModalInstance, List) {
    var vm = this;

    vm.listName = '';

    vm.ok = function () {
      if (vm.listName) {
        $uibModalInstance.close(vm.listName);
      }
      else {
        alert("List's name can not be empty");
      }
    };

    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
