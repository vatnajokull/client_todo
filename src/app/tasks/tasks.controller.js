angular
  .module('clientTodo')
  .controller('TasksController', TasksController);

  function TasksController($scope, Task, $http) {
    var vm = this;
    vm.createTask = createTask;
    vm.getTasks = getTasks;
    vm.removeTask = removeTask;
    vm.queryTask = queryTask;
    vm.updateTask = updateTask;
    vm.changePosition = changePosition;
    vm.toggleCompleted = toggleCompleted;

    function createTask (newTaskForm) {
      var task = new Task({
        listId: newTaskForm.listId,
        title: newTaskForm.title
      });
      newTaskForm.title = '';
      $scope.tasks.push(task);
      task.create();
    }

    function removeTask (task) {
      var index = $scope.tasks.indexOf(task);
      if (index > -1) {
        $scope.tasks.splice(index, 1);
      }
      task.delete();
    }

    function toggleCompleted (task) {
      Task.toggleCompleted(task).then(function(returnedTasks){
        $scope.tasks = angular.copy(returnedTasks);
      });
    }

    function changePosition (task, direction) {
      if (!rulesForBreakingRequest(task, direction)) {
        Task.changePosition(task, direction).then(function (returnedTasks) {
          $scope.tasks = angular.copy(returnedTasks);
        });
      }
    }

    function rulesForBreakingRequest (task, direction) {
      var index = $scope.tasks.indexOf(task);
      var uncompletedTasks = $scope.tasks.filter(function (task) {
        return !task.completed;
      });
      if (index === 0 && direction === 'up') {
        return true;
      } else if (uncompletedTasks.length === index + 1 && direction === 'down') {
        return true;
      }
    }

    function updateTask (task) {
      task.update();
    }

    var tasks_query = function (listId) {
      Task.query({
        listId: listId
      }).then(function (tasks){
        $scope.tasks = tasks;
      });
    };

    function getTasks (listId) {
      queryTask (listId);
    }

    function queryTask (listId) {
      var tasks = Task.get({
        listId: listId
      }).then(function (tasks){
        $scope.tasks = tasks;
      });
    }

  }
