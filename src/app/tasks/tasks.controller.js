angular
  .module('clientTodo')
  .controller('TasksController', TasksController);

  function TasksController($scope, Task, $uibModal) {
    var vm = this;
    vm.createTask = createTask;
    vm.getTasks = getTasks;
    vm.removeTask = removeTask;
    vm.queryTask = queryTask;
    vm.updateTask = updateTask;
    vm.changePosition = changePosition;
    vm.toggleCompleted = toggleCompleted;
    vm.editTaskModal = editTaskModal;

    function createTask (newTaskForm) {
      var task = new Task({
        listId: newTaskForm.listId,
        title: newTaskForm.title
      });
      newTaskForm.title = '';
      task.create().then(function (createdTask) {
        $scope.tasks.push(createdTask);
        });
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

      // console.log('index ' + index);
      // console.log('uncompletedTasks.length' + uncompletedTasks.length);
      // console.log('$scope.tasks.length ' + $scope.tasks.length);

      if (index === 0 && direction === 'up') {
        return true;
      } else if ((uncompletedTasks.length === index || uncompletedTasks.length === index + 1 || uncompletedTasks.length < index) && direction === 'down') {
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

    function editTaskModal (task) {
      var modalInstance = $uibModal.open({
        templateUrl: "app/tasks/edit_task.template.html",
        controller: 'TaskModalInstanceController',
        controllerAs: 'editTaskCtrl',
        resolve: {
          editedTask: function () {
            return task;
          }
        }
      });

      modalInstance.result.then(function (double) {
        task.title = double.title
        task.deadline = double.deadline
        updateTask(task);
      }, function () {
        // failure, for instance show alert, 'cancel' function
      });
    }

  }
