( function () {
  'use strict';

  angular
    .module('MenuApp')
    .component('categories', {
      templateUrl: 'snippets/components/categories.html',
      bindings: {
        categories: '<'
      },
      bindToController: true
    });
})();
