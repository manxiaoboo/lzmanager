'use strict';

angular.module('inspinia')
    .controller('InstallerUpdateController', function (Auth, dataservice, logger, $state, $stateParams,$scope) {

        var vm = this;
        vm.infoid = $stateParams.infoid;
        vm.currentInstaller = {};
         vm.provinces = cityArr.citys;
        vm.citys = [];

        vm.update = update;
        vm.goInformation = goInformation;

        function getInstaller() {
            if (!vm.infoid) return;
            dataservice.getInstaller(vm.infoid).then(function (data) {
                vm.currentInstaller = data;
                bindData(vm.currentInstaller);
                logger.info("获取安装商信息成功");
            }).catch(function (err) {
                logger.error("获取安装商信息失败，请联系管理员");
            });
        }

        function bindData(data) {
            for (var o in data) {
                if (o.indexOf("Date") != -1) {
                    data[o] = new Date(data[o]);
                }else if(o.indexOf("Operating")!= -1){
                    data[o] = new Date(data[o]);
                }
            }
        }

        function update() {
            dataservice.updateInstaller(vm.currentInstaller).then(function (data) {
                logger.success("更新信息成功");
                goInformation();
            }).catch(function (err) {
                logger.error("更新失败，请联系管理员");
            });
        }

        function goInformation() {
            $state.go("index.installer_info", { infoid: vm.currentInstaller._id });
        }

        function init() {
            getInstaller();
            $scope.$watch('ins_update.currentInstaller.AreaProvince',function(){
                for(var o in vm.provinces){
                    if(vm.provinces[o].name==vm.currentInstaller.AreaProvince){
                        vm.citys = vm.provinces[o].sub;
                    }
                }
            });
        }
        init();

    });
