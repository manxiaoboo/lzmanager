'use strict';

angular.module('inspinia')
  .controller('UsersController', function ($scope,$rootScope,dataservice,logger,$state,Auth) {
    var vm = this;
    vm.users = [];
    vm.password = {};


    vm.goChangeCustomPermissions = goChangeCustomPermissions;
    vm.goUserAdd = goUserAdd;
    vm.changePassword = changePassword;

    function getUsersList(){
        dataservice.getUsersList().then(function(datas){
            vm.users = datas;
            logger.success("获取用户列表成功");
        }).catch(function(err){
            logger.error("获取用户列表失败，请联系管理员。");
        });
    }

    function goChangeCustomPermissions(id){
        $state.go("index.customPermissions",{userid:id});
    }

    function goUserAdd(){
        $state.go("index.adduser");
    }

    function init(){
        getUsersList();
    }
    init();

    function changePassword(){
        Auth.changePassword(vm.password.oldp,vm.password.newp).then(function(){
            logger.info("更改密码成功，请重新登录");
            Auth.logout();
            $state.go('index.login');
            
        }).catch(function(err){
            logger.error("更改密码失败，请联系管理员");
        });
    }
  });
