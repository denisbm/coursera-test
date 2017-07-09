(function () {
"use strict";

angular.module('public')
.service('SignUpService', SignUpService);

function SignUpService() {
  var service = this;
  var myInfo;

  service.storeUser = function (user) {
    myInfo = user;
  };

  service.getMyInfo = function () {
    return myInfo;
  }
};

})();
