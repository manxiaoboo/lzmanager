'use strict';

angular.module('inspinia')
  .controller('PersonnelconfigurationCreateController', function (Auth,dataservice,logger,$state,$stateParams) {

    var vm = this;
    vm.currentConfiguration = {};
    vm.currentUser = Auth.getCurrentUser();
    vm.infoid = $stateParams.infoid;

    vm.create = create;
    vm.cancel = cancel;
   

   function create(){
       vm.currentConfiguration.CreatedPerson = vm.currentUser._id;
       vm.currentConfiguration.InstallerNumber = vm.infoid;
       dataservice.createInstaller_Personnelconfigurations(vm.currentConfiguration).then(function(){
           logger.success("创建配置人员情况成功");
           $state.go("index.installer_info",{infoid:vm.infoid});
       }).catch(function(err){
            logger.error("创建配置人员情况失败，请联系管理员");
        });
   }

   function cancel(){
       $state.go("index.installer_info",{infoid:vm.infoid});
   }

  });
