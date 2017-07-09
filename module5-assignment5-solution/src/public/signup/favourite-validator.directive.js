(function () {
"use strict";

angular.module('public')
.directive('dishValidator', DishValidator);

DishValidator.$inject = ['MenuService','$q']
function DishValidator(MenuService, $q){
  return {
    require:'ngModel',
    link:function($scope,element,attrs,ngModel){
      ngModel.$asyncValidators.favouriteNotFound = function(modelValue , viewValue) {
        var userInput= modelValue || viewValue;
        return MenuService.getMenuItem(userInput.toUpperCase()).then(
          function (response) {
            return true;
          },
          function (response) {
            return $q.reject('No such menu number exists');
          });
      }
    }
  }
};
})();
