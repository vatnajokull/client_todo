(function() {
  'use strict';

  angular
    .module('clientTodo')
    .factory('Task', TaskFactory);

    function TaskFactory (railsResourceFactory) {
      return railsResourceFactory({
        url: "/api/lists/{{listId}}/tasks/{{id}}",
        name: 'task'
      });
    }
})();
