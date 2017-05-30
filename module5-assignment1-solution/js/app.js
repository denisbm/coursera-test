( function () {
'use strict';

angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.message = "";
  $scope.dishes = "";
  $scope.messageClass = "";
  $scope.boxClass = "";

  $scope.checkDishes = function () {
    var dishCount = countDishes($scope.dishes);

    $scope.message = messageForDishCount(dishCount);

    toggleClasses(dishCount);
  };

  function countDishes(stringSeparatedByComma) {
    var dishes = stringSeparatedByComma.split(',');
    var count = 0;

    for(var i=0; i < dishes.length; i++) {
      if(dishes[i].trim().length != 0) {
        count++;
      }
    }

    return count;
  }

  function messageForDishCount(dishCount) {
    if(dishCount > 3) {
      return 'Too much!';
    } else if(dishCount > 0 ) {
      return 'Enjoy!';
    } else {
      return 'Please enter data first';
    }
  }

  function toggleClasses(dishCount) {
    if(dishCount > 0) {
      $scope.messageClass = "text-green";
      $scope.boxClass = "border-green";
    } else {
      $scope.messageClass = "text-red";
      $scope.boxClass = "border-red";
    }
  }
}

})();
