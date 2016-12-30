'use strict';

angular.module('inspinia')
  .controller('UserAddController', function ($scope,$rootScope,dataservice,logger,$state,Auth,Util) {
    var vm = this;
    vm.user = {role:'user'};

    vm.create = create;
    vm.goBack = goBack;
    vm.bag = Util.getUserPermission();
    var mergedata;
     

    function init(){
       
    }
    init();

    function goBack(){
        $state.go("index.users");
    }

    function create(){
        merge(vm.bag);
        if (!mergedata) return;
        vm.user.customPermissions = mergedata;
        Auth.createUser(vm.user).then(function(data){
            logger.success("创建用户成功");
            $state.go("index.users");
        }).catch(function(err){
            console.error(err);
            logger.error("创建用户失败，请联系管理员");
        });
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
