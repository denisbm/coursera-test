( function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getPendingItems();
  toBuy.moveItemToBought = function (name) {
    ShoppingListCheckOffService.markItemAsBought(name);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var pendingItems = [
    {name: "Bags", quantity: 10},
    {name: "Cookies", quantity: 10},
    {name: "Pencils", quantity: 10},
    {name: "Laptops", quantity: 10},
    {name: "Lamps", quantity: 10}
  ];

  var boughtItems = [];

  service.markItemAsBought = function (name) {
    for(var i = 0; i < pendingItems.length; i++) {
      if(pendingItems[i].name === name) {
        boughtItems.push(pendingItems[i]);
        pendingItems.splice(i,1);
        break;
      }
    }
  }

  service.getBoughtItems = function () {
    return boughtItems;
  }

  service.getPendingItems = function () {
    return pendingItems;
  }
}

})();
