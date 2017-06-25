( function () {
  'use strict';

  angular
    .module('MenuApp')
    .component('items', {
      templateUrl: 'snippets/components/items.html',
      bindings: {
        items: '<'
      },
      bindToController: true
    });
})();
