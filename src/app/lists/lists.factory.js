(function() {
  'use strict';

  angular
    .module('clientTodo')
    .factory('List', ['railsResourceFactory', 'railsSerializer', function(railsResourceFactory, railsSerializer) {
      return railsResourceFactory({
        url: '/api/lists',
        name: 'list',
        serializer: railsSerializer(function () {
          this.nestedAttribute('tasks');
          this.resource('tasks', 'tasks');
        })

      });
    }
  ]);

})();


// (function() {
//   'use strict';
//
//   angular
//     .module('clientTodo')
//     .factory('List', ['railsResourceFactory', 'railsSerializer', function(railsResourceFactory, railsSerializer) {
//       return railsResourceFactory({
//         url: '/api/lists',
//         name: 'list',
//         serializer: railsSerializer(function () {
//           this.resource('tasks', 'Task');
//         })
//       });
//     }]);
//
// })();
//
