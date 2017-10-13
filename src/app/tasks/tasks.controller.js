angular
  .module('clientTodo')
  .controller('TasksController', TasksController);

  function TasksController($scope, Task, $mdDialog, mdcDateTimeDialog, $filter, $mdToast) {
    var vm = this;

    vm.editedTask = null;

    vm.createTask = createTask;
    vm.getTasks = getTasks;
    vm.removeTask = removeTask;
    vm.queryTask = queryTask;
    vm.updateTask = updateTask;
    vm.changePosition = changePosition;
    vm.toggleCompleted = toggleCompleted;
    vm.resetForm = resetForm;
    vm.showComments = showComments;
    vm.setDeadline = setDeadline;
    vm.showAlertRemoveTask = showAlertRemoveTask;
    vm.getDeadlineClass = getDeadlineClass;
    vm.editTask = editTask;
    vm.updateTask = updateTask;
    vm.cancelEdit = cancelEdit;

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
      console.log('in editedTask');
      vm.editedTask = angular.copy(task);
      console.log(vm.editedTask);
    }

    function updateTask (task, title) {
      console.log('in task update');
      console.log('title is: ' + title);
      task.title =  title;
      task.update().then(function () {
        cancelEdit();
      });
    }

    function cancelEdit () {
      console.log('in task cancelEdit');

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
          // console.log('New Date / Time selected:', date);
        }, function() {
          console.log('Selection canceled');
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
      console.log('in task reset form');
      $scope.showButtonsTask = false;
      form.$setUntouched();
      form.$setPristine();
      form.title = ''
    }

    function showComments (ev, task) {
      console.log('showComments');
      console.log('comments for task id: ' + task.id);
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
      .then(function() {
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
      console.log('in changePosition');
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
      console.log("I am a #tasks_query");
      Task.query({
        listId: listId
      }).then(function (tasks){
        $scope.tasks = tasks;
      });
    };

    function getTasks (listId) {
      console.log("--> getTasks from list " + listId);
      queryTask (listId);
    }

    function queryTask (listId) {
      var tasks = Task.get({
        listId: listId
      }).then(function (tasks){
        $scope.tasks = tasks;
      });
    }

    // function editTaskModal (task) {
    //   var modalInstance = $uibModal.open({
    //     templateUrl: "app/tasks/edit_task.template.html",
    //     controller: 'TaskModalInstanceController',
    //     controllerAs: 'editTaskCtrl',
    //     resolve: {
    //       editedTask: function () {
    //         return task;
    //       }
    //     }
    //   });
    //
    //   modalInstance.result.then(function (double) {
    //     task.title = double.title
    //     task.deadline = double.deadline
    //     updateTask(task);
    //   }, function () {
    //     // failure, for instance show alert, 'cancel' function
    //   });
    // }

  }
