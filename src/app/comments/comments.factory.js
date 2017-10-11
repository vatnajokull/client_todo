(function() {
  'use strict';

  angular
    .module('clientTodo')
    .factory('Comment', CommentFactory);

    function CommentFactory (railsResourceFactory) {
      var resource = railsResourceFactory({
        url: "/api/lists/{{listId}}/tasks/{{taskId}}/comments/{{id}}",
        name: 'comment'
      });

      return resource;
    }
})();
