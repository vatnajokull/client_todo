(function() {
  'use strict';

  angular
    .module('clientTodo')
    .controller('ModalInstanceController', function ($scope, $uibModalInstance, editedList) {
      var lastName = editedList.name;
      $scope.editedList = editedList;

      $scope.ok = function () {
        if ($scope.editedList.name) {
          $uibModalInstance.close($scope.editedList);
        }
        else {
          alert("List's name can not be empty");
        }
      };

      $scope.cancel = function() {
        if ($scope.editedList.name) {
          $uibModalInstance.dismiss('cancel');
        }
        else {
          $scope.editedList.name = lastName;
        }
      };
    }
    );
})();
