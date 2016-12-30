(function() {
  'use strict';

  angular
    .module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap','smart-table','ivh.treeview','ngFileUpload','datatables','datatables.columnfilter','ngLodash','angular-carousel'])
    .constant("appConfig", {
      "userRoles": [
        "guest",
        "user",
        "admin"
      ]
    });

})();
//ng-echarts