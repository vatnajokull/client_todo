(function() {
  'use strict';

  angular
    .module('clientTodo')
    .factory('List', ['railsResourceFactory', function(railsResourceFactory) {
      return railsResourceFactory({
        url: '/api/lists',
        name: 'list'
      });
    }
  ]);

})();
