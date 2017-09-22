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

    function changePosition (task, direction) {

    }

    function updateTask (task) {
      console.log('tried to update ' + task);
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
