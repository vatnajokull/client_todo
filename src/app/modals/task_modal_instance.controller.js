(function() {
  'use strict';

  angular
    .module('clientTodo')
    .controller('TaskModalInstanceController', TaskModalInstanceController);

    function TaskModalInstanceController ($scope, $uibModalInstance, editedTask) {
      var vm = this;

      vm.double = angular.copy(editedTask);

      vm.ok = function () {
        if (vm.double.title) {
          $uibModalInstance.close(vm.double)
        }
        else {
          alert("Task's title can not be empty");
        }
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
})();
