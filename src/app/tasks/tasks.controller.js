angular
  .module('clientTodo')
  .controller('TasksController', TasksController);

  function TasksController($scope, Task) {
    var vm = this;
    vm.createTask = createTask;

    function createTask (newTaskForm) {
      var task = new Task({
        listId: newTaskForm.listId,
        task: {
          title: newTaskForm.title
        }
      });
      task.$save();
    }
  }
