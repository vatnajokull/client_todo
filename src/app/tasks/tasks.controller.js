angular
  .module('clientTodo')
  .controller('TasksController', TasksController);

  function TasksController($scope, Task, $mdDialog, mdcDateTimeDialog, $filter, $mdToast) {
    var vm = this;

    vm.editedTask = null;

    vm.createTask = createTask;
    vm.getTasks = getTasks;
    vm.queryTask = queryTask;
    vm.editTask = editTask;
    vm.cancelEdit = cancelEdit;
    vm.updateTask = updateTask;
    vm.changePosition = changePosition;
    vm.toggleCompleted = toggleCompleted;
    vm.removeTask = removeTask;
    vm.resetForm = resetForm;
    vm.showComments = showComments;
    vm.setDeadline = setDeadline;
    vm.showAlertRemoveTask = showAlertRemoveTask;
    vm.getDeadlineClass = getDeadlineClass;

    function allTasksCompleted() {
      var uncompletedTasks = $filter('filter')($scope.tasks, {'completed':false})
      if (uncompletedTasks.length === 0) {
        $mdToast.show(
          $mdToast.simple()
            .textContent("Well Done! You’re successfully completed all the task.")
            .position('top right' )
            .hideDelay(1500)
        );
      }
    }

    function editTask (task) {
      vm.editedTask = angular.copy(task);
    }

    function updateTask (task, title) {
      task.title =  title;
      task.update().then(function () {
        cancelEdit();
      });
    }

    function cancelEdit () {
      vm.editedTask = null;
    }

    function setDeadline (task) {
      mdcDateTimeDialog.show({
        minDate: new Date (),
        time: true,
        currentDate: task.deadline
      })
        .then(function (date) {
          task.deadline = date;
          task.update();
        }, function() {
        });
    };

    function createTask (form) {
      var task = new Task({
        listId: $scope.list.id,
        title: form.title
      });
      task.create().then(function (createdTask) {
        resetForm(form)
        $scope.tasks.push(createdTask);
        });
    }

    function resetForm (form) {
      $scope.showButtonsTask = false;
      form.$setUntouched();
      form.$setPristine();
      form.title = ''
    }

    function showComments (ev, task) {
      $mdDialog.show({
        locals: {
          passedTask: task
        },
        controller: CommentsController,
        controllerAs: 'vm',
        templateUrl: 'app/comments/comments.view.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(commentsCount) {
      }, function(commentsCount) {
        task.commentsCount = commentsCount
      });
    }

    function getDeadlineClass (task) {
      if (new Date(task.deadline) > new Date() ) {
        return 'future'
      } else {
        return 'past'
      }
    }

    function removeTask(task) {
      var index = $scope.tasks.indexOf(task);
      if (index > -1) {
        $scope.tasks.splice(index, 1);
      }
      task.delete().then(function() {
        allTasksCompleted();
      });
    }

    function showAlertRemoveTask(task, ev) {
      var confirm = $mdDialog.confirm()
            .title('Delete task')
            .textContent('Do you really want to delete "' + task.title + '" ?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Delete')
            .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        removeTask(task);
      }, function() {
        // $scope.status = 'You decided to keep your debt.';
      });
    };

    function toggleCompleted (task) {
      Task.toggleCompleted(task).then(function(returnedTasks){
        $scope.tasks = angular.copy(returnedTasks);
      }).then(function() {
        allTasksCompleted();
      })
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
      } else if ((uncompletedTasks.length === index || uncompletedTasks.length === index + 1 || uncompletedTasks.length < index) && direction === 'down') {
        return true;
      }
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
