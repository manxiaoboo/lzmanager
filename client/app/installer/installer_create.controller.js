'use strict';

angular.module('inspinia')
    .controller('InstallerCreateController', function (Auth, dataservice, logger, $state,$scope) {

        var vm = this;
        vm.currentInstaller = {};
        vm.currentUser = Auth.getCurrentUser();
        vm.provinces = cityArr.citys;
        vm.citys = [];


        vm.create = create;




        function create() {
            vm.currentInstaller.CreatedPerson = vm.currentUser._id;
            dataservice.createInstaller(vm.currentInstaller).then(function () {
                logger.success("创建单位成功");
                $state.go("index.installer_list");
            }).catch(function (err) {
                logger.error("创建单位失败，请联系管理员");
            });
        }

        function init() {
            $scope.$watch('ins_create.currentInstaller.AreaProvince',function(){
                for(var o in vm.provinces){
                    if(vm.provinces[o].name==vm.currentInstaller.AreaProvince){
                        vm.citys = vm.provinces[o].sub;
                    }
                }
            });
        }
        init();

    });
