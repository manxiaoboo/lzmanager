'use strict';

angular.module('inspinia')
  .controller('BusinesscontactCreateController', function (Auth,dataservice,logger,$state,$stateParams) {

    var vm = this;
    vm.currentContact = {};
    vm.currentUser = Auth.getCurrentUser();
    vm.infoid = $stateParams.infoid;

    vm.create = create;
    vm.cancel = cancel;

    
   function create(){
       vm.currentContact.CreatedPerson = vm.currentUser._id;
       vm.currentContact.InstallerNumber = vm.infoid;
       dataservice.createInstaller_Businesscontact(vm.currentContact).then(function(){
           logger.success("创建业务联系人成功");
           $state.go("index.installer_info",{infoid:vm.infoid});
       }).catch(function(err){
            logger.error("创建业务联系人失败，请联系管理员");
        });
   }

   function cancel(){
       $state.go("index.installer_info",{infoid:vm.infoid});
   }

  });
