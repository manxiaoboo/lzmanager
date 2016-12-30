'use strict';

angular.module('inspinia')
  .controller('InstallerListController', function ($state,dataservice,logger) {

    var vm = this;
    vm.installers = [];


    vm.createInstaller = createInstaller;
    vm.listInstallers = listInstallers;
    vm.goInformation = goInformation;
    vm.showMore = showMore;

    vm.limit = 15;


    function showMore(){
        vm.limit+=15;
    }
   
    function createInstaller(){
        $state.go("index.installer_create");
    }

    function listInstallers(){
        dataservice.listInstaller().then(function(datas){
            vm.installers = datas;
            logger.info("安装商列表获取成功");
        }).catch(function(err){
            logger.error("获取安装商列表失败，请联系管理员");
        });
    }

    function goInformation(id){
        $state.go("index.installer_info",{infoid:id});
    }

    function init(){
        listInstallers();
    }

    init();
  });
