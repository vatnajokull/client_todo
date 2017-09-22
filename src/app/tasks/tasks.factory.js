(function() {
  'use strict';

  angular
    .module('clientTodo')
    .factory('Task', ['railsResourceFactory', function(railsResourceFactory) {
      return railsResourceFactory({
        url: "/api/lists/{{listId}}/tasks/{{id}}",
        name: 'task'
      });
    }
  ]);

})();
