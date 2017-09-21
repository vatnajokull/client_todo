(function() {
  'use strict';

  angular
    .module('clientTodo')
    .factory('Task', TaskFactory);

    function TaskFactory($resource) {
      var Task = $resource("/api/lists/:listId/tasks/", { listId: '@listId' });

      return Task;
    }

})();
