'use strict';

angular.module('inspinia')
    .controller('BusinesscontactUpdateController', function (Auth, dataservice, logger, $state, $stateParams) {

        var vm = this;
        vm.currentContact = {};
        vm.currentUser = Auth.getCurrentUser();
        vm.contactid = $stateParams.contactid;

        vm.update = update;
        vm.cancel = cancel;


        function init(){
            getBusinesscountact();
        }
        init();

        function getBusinesscountact(){
            dataservice.getInstaller_BusinesscontactById(vm.contactid).then(function(data){
                vm.currentContact = data;
                var date = new Date(vm.currentContact.ContactRegistrationDate);
                vm.currentContact.ContactRegistrationDate = date;
                logger.success("成功","获取业务联系人成功");
            }).catch(function (err) {
                logger.error("失败","获取业务联系人失败，请联系管理员");
            });
        }

        function update() {
            dataservice.updateInstaller_Businesscontact(vm.currentContact).then(function () {
                logger.success("更新业务联系人成功");
                $state.go("index.installer_info", { infoid: vm.currentContact.InstallerNumber });
            }).catch(function (err) {
                logger.error("更新业务联系人失败，请联系管理员");
            });
        }

        function cancel() {
            $state.go("index.installer_info", { infoid:  vm.currentContact.InstallerNumber});
        }

    });
