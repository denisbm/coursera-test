( function () {
'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .controller('FoundItemsDirectiveController', FoundItemsDirectiveController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'itemList.html',
    restrict: 'E',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: 'FoundItemsDirectiveController as dirCtrl',
    bindToController: true
  }

  return ddo;
}

function FoundItemsDirectiveController() {
  var dirCtrl = this;

  dirCtrl.showNoResults = function () {
    if(dirCtrl.foundItems != undefined &&
       dirCtrl.foundItems.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  dirCtrl.hasItems = function () {
    if(dirCtrl.foundItems != undefined &&
       dirCtrl.foundItems.length > 0) {
      return true
    } else {
      return false;
    }
  }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  ctrl.populateList = function (searchTerm) {
    MenuSearchService.getMatchedMenuItems(searchTerm)
    .then( function (response) {
      ctrl.found = response;
    }).catch( function (error) {
      console.log("Error retrieving items " + error);
    });
  }

  ctrl.removeItem = function (index) {
    ctrl.found.splice(index,1);
  }
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
    }).then(function (response) {
      searchTerm = searchTerm || "";

      var items = response.data['menu_items'];
      var found = [];

      if(searchTerm != "") {
        for(var i = 0; i < items.length; i++ ) {
          if(items[i]['description'].search(searchTerm) != -1 ) {
            found.push(items[i]);
          }
        }
      }

      return found;
    });
  }
}

})();
