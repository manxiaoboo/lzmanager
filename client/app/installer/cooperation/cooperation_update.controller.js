'use strict';

angular.module('inspinia')
    .controller('CooperationUpdateController', function (Auth, dataservice, logger, $state, $stateParams) {

        var vm = this;
        vm.currentCooperation = {};
        vm.currentUser = Auth.getCurrentUser();
        vm.cooperationid = $stateParams.cooperationid;

        vm.update = update;
        vm.cancel = cancel;


        function init(){
            getInstaller_CooperationById();
        }
        init();

        function getInstaller_CooperationById(){
            dataservice.getInstaller_CooperationById(vm.cooperationid).then(function(data){
                vm.currentCooperation = data;
                if(!!vm.currentCooperation.ProjectCreateDate){
                    vm.currentCooperation.ProjectCreateDate = new Date(vm.currentCooperation.ProjectCreateDate);
                }
                if(!!vm.currentCooperation.ProjectStartDate){
                    vm.currentCooperation.ProjectStartDate = new Date(vm.currentCooperation.ProjectStartDate);
                }
                if(!!vm.currentCooperation.ProjectEndDate){
                    vm.currentCooperation.ProjectEndDate = new Date(vm.currentCooperation.ProjectEndDate);
                }
                if(!!vm.currentCooperation.ProjectMoney){
                    vm.currentCooperation.ProjectMoney = Number(vm.currentCooperation.ProjectMoney);
                }
            }).catch(function (err) {
                logger.error("失败","获取合作经历失败，请联系管理员");
            });
        }

        function update() {
            dataservice.updateInstaller_Cooperation(vm.currentCooperation).then(function () {
                logger.success("更新合作经历成功");
                $state.go("index.installer_info",{infoid:vm.currentCooperation.InstallerNumber});
            }).catch(function (err) {
                logger.error("更新合作经历失败，请联系管理员");
            });
        }

        function cancel() {
            $state.go("index.installer_info", { infoid: vm.currentCooperation.InstallerNumber});
        }

    });
