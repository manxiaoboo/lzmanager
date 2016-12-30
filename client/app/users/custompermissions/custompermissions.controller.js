'use strict';

angular.module('inspinia')
    .controller('CustomPermissionsController', function ($scope, $stateParams, $rootScope, dataservice, logger,Util) {
        var vm = this;
        vm.currentUser = {};
        vm.userid = $stateParams.userid;
        vm.bag = [];
        var mergedata;

        vm.save = save;

        var defaultuser = Util.getUserPermission();

        var defaultadmin = Util.getAdminPermission();

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

        function getUser() {
            dataservice.getUser(vm.userid).then(function (data) {
                vm.currentUser = data;
                if (vm.currentUser.customPermissions <= 0 && vm.currentUser.role == "user") {
                    vm.bag = defaultuser;
                }
                else if (vm.currentUser.customPermissions <= 0 && vm.currentUser.role == "admin") {
                    vm.bag = defaultadmin;
                }else{
                    vm.bag = defaultuser;
                    premerge(vm.bag,vm.currentUser.customPermissions);
                }
                logger.success("获取用户信息成功");
            }).catch(function (err) {
                logger.error("获取用户信息失败，请联系管理员。");
            });
        }

        function save() {
            merge(vm.bag);
            if (!mergedata) return;
            dataservice.changePermissions(vm.userid, { customPermissions: mergedata }).then(function (data) {
                logger.success("保存权限成功");
            }).catch(function (err) {
                logger.error("保存权限失败，请联系管理员");
            });
        }

        function init() {
            getUser();
        }
        init();
    });
