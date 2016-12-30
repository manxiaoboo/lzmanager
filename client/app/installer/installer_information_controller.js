'use strict';

angular.module('inspinia')
  .controller('InstallerInformationController', function ($state, $stateParams, dataservice, logger, $uibModal) {

    var vm = this;
    vm.infoid = $stateParams.infoid;
    vm.installer = {};
    vm.installer_personnelconfiguration;
    vm.installer_businesscontact = [];
    vm.isCollapsed = false;
    vm.currentContact = {};
    vm.dtOptions = {
      dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
      pagingType: 'full',
      "language": {
        "paginate": {
          "next": "下一页",
          "previous": "上一页",
          "last": "尾页",
          "first": "首页"
        },
        "emptyTable": "没有数据",
        "lengthMenu": "显示 _MENU_ 条",
        "info": "正在显示第 _START_ 至 _END_ 条，共 _TOTAL_ 条",
         "search":"搜索"
      },
      autoWidth: true,
      responsive: false
    };



    vm.goUpdate = goUpdate;
    vm.goCreateConfiguration = goCreateConfiguration;
    vm.goUpdateConfiguration = goUpdateConfiguration;
    vm.goCreateContact = goCreateContact;
    vm.goUpdateContact = goUpdateContact;
    vm.goCreateCooperation = goCreateCooperation;
    vm.goUpdateCooperation = goUpdateCooperation;
    vm.goCreateAchievement = goCreateAchievement;
    vm.goUpdateAchievement = goUpdateAchievement;
    vm.goCreateInvestigate = goCreateInvestigate;
    vm.goUpdateInvestigate = goUpdateInvestigate;
    vm.goFiles = goFiles;
    vm.contacttoggle = contacttoggle;
    vm.openContent = openContent;
    vm.deleteContact = deleteContact;
    vm.deleteInstaller_Cooperation = deleteInstaller_Cooperation;
    vm.deleteInstaller_Achievement = deleteInstaller_Achievement;
    vm.deleteInstaller_Investigate = deleteInstaller_Investigate;



    function openContent(content) {
      $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title-top',
        ariaDescribedBy: 'modal-body-top',
        template: '<div class="modal-header"><h3 class="modal-title" id="modal-title">项目说明</h3><div class="modal-body" id="modal-body"><p>' + content + '</p></div></div>',
        size: 'sm'
      });
    }

    function getInstaller() {
      if (!vm.infoid) return;
      dataservice.getInstaller(vm.infoid).then(function (data) {
        vm.installer = data;
        getInstaller_Businesscontact();
        getInstaller_Personnelconfiguration();
        getInstaller_CooperationsByInstaller();
        getInstaller_AchievementsByInstaller();
        getInstaller_InvestigatesByInstaller();
      }).catch(function (err) {
        logger.error("获取安装商信息失败，请联系管理员");
      });
    }

    function getInstaller_InvestigatesByInstaller() {
      dataservice.getInstaller_InvestigatesByInstaller(vm.infoid).then(function (datas) {
        vm.installer_Investigates = datas;
      }).catch(function (err) {
        logger.error("获取考察情况列表失败，请联系管理员");
      });
    }

    function getInstaller_AchievementsByInstaller() {
      dataservice.getInstaller_AchievementsByInstaller(vm.infoid).then(function (datas) {
        vm.installer_Achievements = datas;
      }).catch(function (err) {
        logger.error("获取单位业绩列表失败，请联系管理员");
      });
    }

    function getInstaller_CooperationsByInstaller() {
      dataservice.getInstaller_CooperationsByInstaller(vm.infoid).then(function (datas) {
        vm.installer_Cooperations = datas;
      }).catch(function (err) {
        logger.error("获取合作经历列表失败，请联系管理员");
      });
    }

    function getInstaller_Personnelconfiguration() {
      dataservice.getInstaller_PersonnelconfigurationByInstallerId(vm.infoid).then(function (data) {
        data[0].InstallerCount = 
        Number(data[0].TechnicalCount)+
        Number(data[0].ProjectManagerCount)+
        Number(data[0].TypeofElectromechanical)+
        Number(data[0].TypeofCivil)+
        Number(data[0].TechnicalLeaderCount)+
        Number(data[0].SecurityOfficerCount)+
        Number(data[0].ConstructionCount)+
        Number(data[0].ManufacturingCostCount)+
        Number(data[0].InspectorCount)+
        Number(data[0].ArchivistCount)+
        Number(data[0].MaterialMemberCount)+
        Number(data[0].SpecialOperationCount)+
        Number(data[0].AfterSalesCount)+
        Number(data[0].OtherPersonCount);
        vm.installer_personnelconfiguration = data[0];
      }).catch(function (err) {
        logger.error("获取人员配置情况失败，请确认是否已经创建");
      });
    }

     function getInstaller_Businesscontact() {
      dataservice.getInstaller_BusinesscontactByInstallerId(vm.infoid).then(function (data) {
        vm.installer_businesscontact = data;
      }).catch(function (err) {
        logger.error("获取业务联系人列表失败，请联系管理员");
      });
    }


    function deleteContact(id) {
      if (confirm("您确认删除吗？")) {
        dataservice.deleteInstaller_Businesscontact(id).then(function (data) {
          logger.success("删除人员配置情况成功");
          init();
        }).catch(function (err) {
          logger.error("删除人员配置情况失败，请联系管理员");
        });
      }
    }

    function deleteInstaller_Cooperation(id){
        if (confirm("您确认删除吗？")) {
        dataservice.deleteInstaller_Cooperation(id).then(function (data) {
          logger.success("删除合作经历成功");
          init();
        }).catch(function (err) {
          logger.error("删除合作经历失败，请联系管理员");
        });
      }
    }

    function deleteInstaller_Achievement(id){
       if (confirm("您确认删除吗？")) {
        dataservice.deleteInstaller_Achievement(id).then(function (data) {
          logger.success("删除单位业绩成功");
          init();
        }).catch(function (err) {
          logger.error("删除单位业绩失败，请联系管理员");
        });
      }
    }

    function deleteInstaller_Investigate(id){
       if (confirm("您确认删除吗？")) {
        dataservice.deleteInstaller_Investigate(id).then(function (data) {
          logger.success("删除考察情况成功");
          init();
        }).catch(function (err) {
          logger.error("删除考察情况失败，请联系管理员");
        });
      }
    }


    function contacttoggle(e) {
      if (!vm.currentContact._id) vm.currentContact = e;
      if (vm.currentContact._id == e._id) {
        vm.isCollapsed = !vm.isCollapsed;
      } else {
        vm.currentContact = e;
      }
    }

    function goUpdate() {
      $state.go("index.installer_update", { infoid: vm.infoid });
    }
    function goCreateConfiguration() {
      $state.go("index.personnelconfiguration_create", { infoid: vm.infoid });
    }
    function goUpdateConfiguration() {
      $state.go("index.personnelconfiguration_update", { configid: vm.installer_personnelconfiguration._id });
    }
    function goCreateContact() {
      $state.go("index.businesscontact_create", { infoid: vm.infoid });
    }
    function goUpdateContact(id) {
      $state.go("index.businesscontact_update", { contactid: id });
    }
    function goCreateCooperation() {
      $state.go("index.cooperation_create", { infoid: vm.infoid });
    }
    function goUpdateCooperation(id) {
      $state.go("index.cooperation_update", { cooperationid: id });
    }
    function goCreateAchievement() {
      $state.go("index.achievement_create", { infoid: vm.infoid });
    }
    function goUpdateAchievement(id) {
      $state.go("index.achievement_update", { achievementid: id });
    }
    function goCreateInvestigate() {
      $state.go("index.investigate_create", { infoid: vm.infoid });
    }
    function goUpdateInvestigate(id) {
      $state.go("index.investigate_update", { investigateid: id });
    }
    function goFiles() {
      $state.go("index.files", { infoid: vm.infoid });
    }

    function init() {
      getInstaller();
    }
    init();

  });
