(function() {
  'use strict';

  angular
    .module('clientTodo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
