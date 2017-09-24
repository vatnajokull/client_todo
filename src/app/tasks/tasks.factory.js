(function() {
  'use strict';

  angular
    .module('clientTodo')
    .factory('Task', TaskFactory);

    function TaskFactory (railsResourceFactory) {
      var resource = railsResourceFactory({
        url: "/api/lists/{{listId}}/tasks/{{id}}",
        name: 'task'
      });

      resource.toggleCompleted = function (task) {
        return resource.$get("/api/lists/" + task.listId + "/tasks/" + task.id + "/toggle_completed");
      };

      resource.changePosition = function (task, direction) {
        return resource.$get("/api/lists/" + task.listId + "/tasks/" + task.id + "/change_position", {direction: direction});
      };

      return resource;
    }
})();
