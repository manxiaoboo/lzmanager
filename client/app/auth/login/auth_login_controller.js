'use strict';

angular.module('inspinia')
  .controller('AuthLoginController', function (Auth, $state,$rootScope,dataservice, logger,Util) {

    var vm = this;
    vm.submitted = false;
    vm.errors = {};
    vm.user = {};
    vm.currentUser = {};
    vm.bag = [];
    var mergedata;
    vm.Auth = Auth;
    vm.$state = $state;
    $rootScope.islogin = true;

    vm.login = login;
    vm.logout = logout;

    var defaultuser = Util.getUserPermission();
    var defaultadmin = Util.getAdminPermission();

    function login(form){
      vm.submitted = true;
      if (form.$valid) {
        vm.Auth.login({
          email: vm.user.email,
          password: vm.user.password
        })
        .then((data) => {
          // Logged in, redirect to home
          if(!data.customPermissions || data.customPermissions.length<=0){
            vm.currentUser = data;
            bindCustomPermissions();
          }else{
            vm.$state.go('index.main');
          }
        })
        .catch(err => {
          vm.errors.other = err.message;
        });
      }
    }

    function bindCustomPermissions(){
      var result;
      if (vm.currentUser.customPermissions <= 0 && vm.currentUser.role == "user") {
                    vm.bag = defaultuser;
                }
                else if (vm.currentUser.customPermissions <= 0 && vm.currentUser.role == "admin") {
                    vm.bag = defaultadmin;
                }else{
                    vm.bag = defaultuser;
                    premerge(vm.bag,vm.currentUser.customPermissions);
                }
                save();
    }

    function save() {
            merge(vm.bag);
            if (!mergedata) return;
            dataservice.changePermissions(vm.currentUser._id, { customPermissions: mergedata }).then(function (data) {
              vm.$state.go('index.main');
            }).catch(function (err) {
                logger.error("保存权限失败，请联系管理员");
            });
        }

    function logout(){
      console.info("logout");
      Auth.logout();
      $state.go("index.login");
    }

     function merge(arr) {
            if (!mergedata) mergedata = [];
            arr.forEach(function (e) {
                mergedata.push({ label: e.label, value: e.selected });
                if (!!e.children) {
                    return merge(e.children);
                }
            })
        }

        function premerge(arr,custom) {
            arr.forEach(function (e) {
                custom.forEach(function(o){
                    if(e.label===o.label){
                        e.selected = o.value;
                    }
                });
                if (!!e.children) {
                    return premerge(e.children,custom);
                }
            })
        }


  });
