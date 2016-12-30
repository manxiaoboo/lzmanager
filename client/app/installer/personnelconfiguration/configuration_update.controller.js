'use strict';

angular.module('inspinia')
    .controller('PersonnelconfigurationUpdateController', function (Auth, dataservice, logger, $state, $stateParams) {

        var vm = this;
        vm.configid = $stateParams.configid;
        vm.currentConfiguration = {};


        vm.update = update;
        vm.goInformation = goInformation;

        function getInstaller_PersonnelconfigurationByInstallerId() {
            if (!vm.configid) return;
            dataservice.getInstaller_PersonnelconfigurationById(vm.configid).then(function (data) {
                vm.currentConfiguration = data;
                logger.info("获取配置人员信息成功");
            }).catch(function (err) {
                logger.error("获取配置人员信息失败，请联系管理员");
            });
        }

        function update() {
            dataservice.updateInstaller_Personnelconfiguration(vm.currentConfiguration).then(function (data) {
                logger.success("更新信息成功");
                goInformation();
            }).catch(function (err) {
                logger.error("更新失败，请联系管理员");
            });
        }

        function goInformation() {
            $state.go("index.installer_info", { infoid: vm.currentConfiguration.InstallerNumber });
        }

        function init() {
            getInstaller_PersonnelconfigurationByInstallerId();
        }
        init();

    });
