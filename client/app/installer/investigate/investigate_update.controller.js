'use strict';

angular.module('inspinia')
    .controller('InvestigateUpdateController', function (Auth, dataservice, logger, $state, $stateParams) {

        var vm = this;
        vm.currentInvestigate = {};
        vm.currentUser = Auth.getCurrentUser();
        vm.investigateid = $stateParams.investigateid;

        vm.update = update;
        vm.cancel = cancel;


        function init(){
            getInstaller_InvestigateById();
        }
        init();

        function getInstaller_InvestigateById(){
            dataservice.getInstaller_InvestigateById(vm.investigateid).then(function(data){
                vm.currentInvestigate = data;
                vm.currentInvestigate.ProjectMoney = Number(vm.currentInvestigate.ProjectMoney);
                vm.currentInvestigate.InvestigateDate = new Date(vm.currentInvestigate.InvestigateDate);
            }).catch(function (err) {
                logger.error("失败","获取考察情况失败，请联系管理员");
            });
        }

        function update() {
            dataservice.updateInstaller_Investigate(vm.currentInvestigate).then(function () {
                logger.success("更新单位业绩成功");
                $state.go("index.installer_info",{infoid:vm.currentInvestigate.InstallerNumber});
            }).catch(function (err) {
                logger.error("更新考察情况失败，请联系管理员");
            });
        }

        function cancel() {
            $state.go("index.installer_info", { infoid: vm.currentInvestigate.InstallerNumber});
        }

    });
