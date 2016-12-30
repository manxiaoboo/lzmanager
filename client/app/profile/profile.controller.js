'use strict';

angular.module('inspinia')
  .controller('ProfileController', function ($scope, $rootScope, Auth, $state, $uibModal, dataservice, logger, $http, Upload) {
    var vm = this;
    Auth.getCurrentUser().then((data)=>init(data));
    vm.animationsEnabled = true;
    vm.memos = [];


    vm.goChangePassword = goChangePassword;
    vm.logout = logout;
    vm.open = open;
    vm.deleteMemo = deleteMemo;
    vm.updateMemo = updateMemo;
    vm.upload = upload;

 vm.showMore = showMore;

    vm.limit = 10;


    function showMore(){
        vm.limit+=10;
    }



    function upload(file) {
      if (!!file) {
        Upload.upload({
          url: '/api/users/changeHead/'+vm.currentUser._id,
          data: { file: file },
          method: "POST"
        }).then(function (resp) {
          vm.headurl = "http://oh4l42l8h.bkt.clouddn.com/"+vm.currentUser.head+"?"+Math.random()*1000;
          logger.success("修改头像成功，如果未更新，请刷新页面");
        }, function (resp) {
          console.log('Error status: ' + resp.status);
        }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
      }
    }

    function goChangePassword() {
      $state.go('index.changepassword');
    }

    function logout() {
      Auth.logout();
      $state.go("index.login");
    }

    function open(size, parentSelector) {
      var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: 'modal',
        size: size,
        appendTo: parentElem,
        resolve: {
          memo: function () {
            return null;
          },
          userid: function () {
            return vm.currentUser._id;
          }
        }
      });
      modalInstance.result.then(function () {
        getMemos();
      });
    }

    function getMemos() {
      dataservice.listMemos(vm.currentUser._id).then(function (datas) {
        vm.memos = datas;
        logger.success("获取便签列表成功");
      }).catch(function (err) {
        logger.error("获取便签列表失败，请联系管理员");
      });
    }

    function deleteMemo(id) {
      if (confirm("您确认删除此条便签吗？")) {
        dataservice.deleteMemo(id).then(function () {
          logger.success("删除便签成功");
          getMemos();
        }).catch(function (err) {
          logger.error("删除便签失败，请联系管理员");
        });
      }
    }

    function updateMemo(memo, size, parentSelector) {
      var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: 'modal',
        size: size,
        appendTo: parentElem,
        resolve: {
          memo: function () {
            return memo;
          },
          userid: function () {
            return memo._id
          }
        }
      });
      modalInstance.result.then(function () {
        getMemos();
      });
    }

    function init(data) {
      vm.currentUser = data;
      vm.headurl = "http://oh4l42l8h.bkt.clouddn.com/"+vm.currentUser.head+"?"+Math.random()*1000;
      getMemos();
    }

  });

angular.module('inspinia')
  .controller('ModalInstanceCtrl', function ($uibModalInstance, userid, dataservice, logger, memo) {
    var vm = this;
    vm.userid = userid;
    vm.memo = {};
    if (!!memo) vm.memo = memo;


    vm.ok = function () {
      if (!vm.memo.Rating || !vm.memo.Content) {
        logger.warning("请填写重要度和内容");
        return;
      }
      if (!vm.memo.CreatedPerson) vm.memo.CreatedPerson = vm.userid;
      dataservice.createMemo(vm.memo).then(function () {
        logger.success("创建便签成功");
        $uibModalInstance.close("");
      }).catch(function (err) {
        logger.error("创建便签失败，请联系管理员");
      });
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    function randomData() {
      return Math.round(Math.random() * 1000);
    }


  });