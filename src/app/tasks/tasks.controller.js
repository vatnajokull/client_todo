angular
  .module('clientTodo')
  .controller('TasksController', TasksController);

  function TasksController($scope, Task) {
    var vm = this;
    vm.createTask = createTask;
    vm.getTasks = getTasks;
    vm.removeTask = removeTask;

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

    var tasks_query = function (listId) {
      Task.query({
        listId: listId
      }).then(function (tasks){
        $scope.tasks = tasks;
      });
    };

    function getTasks (listId) {
      var tasks = Task.get({
        listId: listId
      }).then(function (tasks){
        $scope.tasks = tasks;
      });
    }
  }
