'use strict';

angular.module('inspinia')
  .controller('InvestigateCreateController', function (Auth,dataservice,logger,$state,$stateParams) {

    var vm = this;
    vm.currentInvestigate = {MoneyType:"元"};
    vm.currentUser = Auth.getCurrentUser();
    vm.infoid = $stateParams.infoid;

    vm.create = create;
    vm.cancel = cancel;

    
   function create(){
       vm.currentInvestigate.CreatedPerson = vm.currentUser._id;
       vm.currentInvestigate.InstallerNumber = vm.infoid;
       dataservice.createInstaller_Investigate(vm.currentInvestigate).then(function(){
           logger.success("创建考察情况成功");
           $state.go("index.installer_info",{infoid:vm.infoid});
       }).catch(function(err){
            logger.error("创建考察情况失败，请联系管理员");
        });
   }

   function cancel(){
       $state.go("index.installer_info",{infoid:vm.infoid});
   }

  });
