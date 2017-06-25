( function () {
  'use strict';

  angular
    .module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'snippets/home.html'
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'snippets/categories.html',
        controller: 'CategoriesController as categoriesCtrl',
        resolve: {
          categories : ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('items', {
        url: '/{category}/items',
        templateUrl: 'snippets/categoryItems.html',
        controller: 'ItemsController as itemsCtrl',
        resolve: {
          items : ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.category);
          }]
        }
      });
  };
})();
