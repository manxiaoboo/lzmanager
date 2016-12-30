'use strict';

angular.module('inspinia')
  .controller('AchievementCreateController', function (Auth,dataservice,logger,$state,$stateParams) {

    var vm = this;
    vm.currentAchievement = {MoneyType:"元"};
    vm.currentUser = Auth.getCurrentUser();
    vm.infoid = $stateParams.infoid;

    vm.create = create;
    vm.cancel = cancel;

    
   function create(){
       vm.currentAchievement.CreatedPerson = vm.currentUser._id;
       vm.currentAchievement.InstallerNumber = vm.infoid;
       dataservice.createInstaller_Achievement(vm.currentAchievement).then(function(){
           logger.success("创建单位业绩成功");
           $state.go("index.installer_info",{infoid:vm.infoid});
       }).catch(function(err){
            logger.error("创建单位业绩失败，请联系管理员");
        });
   }

   function cancel(){
       $state.go("index.installer_info",{infoid:vm.infoid});
   }

  });
