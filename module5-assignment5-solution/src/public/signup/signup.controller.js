(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SignUpService'];
function SignUpController(SignUpService) {
  var $ctrl = this;

  $ctrl.saved=false;

  $ctrl.submit = function () {
    $ctrl.user.favourite = $ctrl.user.favourite.toUpperCase();
    SignUpService.storeUser($ctrl.user);
    $ctrl.saved=true;
  }
}


})();
