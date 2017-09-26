angular
  .module('clientTodo')
  .controller('datepickerController', datepickerController);

  function datepickerController($scope, uibDateParser) {

    $scope.today = function() {
      $scope.editTaskCtrl.double.deadline = new Date();
    };

    $scope.clear = function() {
      $scope.editTaskCtrl.double.deadline = null;
    };

    $scope.showDate = function() {
      $scope.editTaskCtrl.double.deadline = $scope.editTaskCtrl.double.deadline ? new Date($scope.editTaskCtrl.double.deadline) : null;
    }

    $scope.showDate();

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
     opened: false
    };

    $scope.popup2 = {
     opened: false
    };

  }
