'use strict';

angular.module('inspinia')
  .controller('CommonController', function (Auth, $state) {

    var vm = this;

    vm.logout = logout;
    getCurrentUser();



    function logout() {
      Auth.logout();
      $state.go("index.login");
    }

    function getCurrentUser() {
      Auth.getCurrentUser().then((data) => bindData(data));
    }

    function bindData(data) {
      vm.currentuser = data;
      if (!!vm.currentuser.head) {
        vm.headurl = "http://oh4l42l8h.bkt.clouddn.com/" + vm.currentuser.head + "?" + Math.random() * 1000;
      } else {
        vm.headurl = "../../../assets/images/profile_small.jpg";
      }
    }

  });
