'use strict';

angular.module('inspinia')
    .controller('MaterialViewController', function (Auth, dataservice, logger, $state, $scope, $stateParams,Carousel) {

        var vm = this;
        vm.currentMaterial;
        vm.currentUser = Auth.getCurrentUser();
        vm.materialid = $stateParams.materialid;
        vm.Carousel = Carousel;
        vm.goList = goList;

        function getMaterial() {
            dataservice.getMaterial(vm.materialid).then(function (data) {
                data.RegistrationDate = new Date(data.RegistrationDate);
                data.UpdateDate = new Date(data.UpdateDate);
                vm.currentMaterial = data;
                for(var o in vm.currentMaterial.Images){
                    vm.currentMaterial.Images[o].id = o+1;
                }
                console.info(data);
            }).catch(function (err) {
                logger.error("获取安装材料失败，请联系管理员");
            });
        }

        function goList(){
            $state.go("index.material");
        }

        function init() {
            getMaterial();
        }
        init();

    });
