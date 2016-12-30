'use strict';

angular.module('inspinia')
    .controller('AchievementUpdateController', function (Auth, dataservice, logger, $state, $stateParams) {

        var vm = this;
        vm.currentAchievement = {};
        vm.currentUser = Auth.getCurrentUser();
        vm.achievementid = $stateParams.achievementid;

        vm.update = update;
        vm.cancel = cancel;


        function init(){
            getInstaller_AchievementById();
        }
        init();

        function getInstaller_AchievementById(){
            dataservice.getInstaller_AchievementById(vm.achievementid).then(function(data){
                vm.currentAchievement = data;
                vm.currentAchievement.ProjectMoney = Number(vm.currentAchievement.ProjectMoney);
            }).catch(function (err) {
                logger.error("失败","获取单位业绩失败，请联系管理员");
            });
        }

        function update() {
            dataservice.updateInstaller_Achievement(vm.currentAchievement).then(function () {
                logger.success("更新单位业绩成功");
                $state.go("index.installer_info",{infoid:vm.currentAchievement.InstallerNumber});
            }).catch(function (err) {
                logger.error("更新单位业绩失败，请联系管理员");
            });
        }

        function cancel() {
            $state.go("index.installer_info", { infoid: vm.currentAchievement.InstallerNumber});
        }

    });
