'use strict';

angular.module('inspinia')
  .controller('CooperationCreateController', function (Auth,dataservice,logger,$state,$stateParams) {

    var vm = this;
    vm.currentCooperation = {MoneyType:"元"};
    vm.currentUser = Auth.getCurrentUser();
    vm.infoid = $stateParams.infoid;

    vm.create = create;
    vm.cancel = cancel;

    
   function create(){
       vm.currentCooperation.CreatedPerson = vm.currentUser._id;
       vm.currentCooperation.InstallerNumber = vm.infoid;
       dataservice.createInstaller_Cooperation(vm.currentCooperation).then(function(){
           logger.success("创建合作经历成功");
           $state.go("index.installer_info",{infoid:vm.infoid});
       }).catch(function(err){
            logger.error("创建合作经历失败，请联系管理员");
        });
   }

   function cancel(){
       $state.go("index.installer_info",{infoid:vm.infoid});
   }

  });
