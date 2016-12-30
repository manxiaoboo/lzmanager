'use strict';

angular.module('inspinia')
    .controller('MaterialUpdateController', function (Auth, dataservice, logger, $state, $scope, $stateParams, Upload) {

        var vm = this;
        vm.currentMaterial;
        vm.currentUser = Auth.getCurrentUser();
        vm.materialid = $stateParams.materialid;
        vm.provinces = cityArr.citys;
        vm.citys = [];


        vm.update = update;
        vm.cancel = cancel;
        vm.upload = upload;
        vm.deleteImage = deleteImage;


        vm.types = [
            '吊杆','镀锌钢管','方型散流器','防火型风量调节阀','防雨百叶窗','分线盒','分液器（内机用）','分液器（外机用）',
            '风管（含保温）','风口软连接','风量调节阀','回风箱','混凝土基础','控制器线及套管','控制线','控制线及套管',
            '门铰式回风口','排水管','柔性软管','室内机电缆','室内机人工费','室外电缆桥架','室外机电缆','室外机人工费',
            '单层百叶出风口','双层百叶出风口','水管保温','铜管','线管','铜管保温材'
        ];

        function getMaterial() {
            dataservice.getMaterial(vm.materialid).then(function (data) {
                data.RegistrationDate = new Date(data.RegistrationDate);
                data.UpdateDate = new Date(data.UpdateDate);
                vm.currentMaterial = data;
                console.info(data);
                $scope.$watch('mu_update.currentMaterial.AreaProvince', function () {
                    for (var o in vm.provinces) {
                        if (vm.provinces[o].name == vm.currentMaterial.AreaProvince) {
                            vm.citys = vm.provinces[o].sub;
                        }
                    }
                });
            }).catch(function (err) {
                logger.error("获取安装材料失败，请联系管理员");
            });
        }

        function deleteImage(key) {
            if (confirm("您确认删除此图片吗？")) {
                dataservice.Material_deleteImage(vm.currentMaterial, key).then(function () {
                    logger.success("删除图片成功");
                    _.remove(vm.currentMaterial.Images, function(n) {
                        return n.Key === key;
                    });
                }).catch(function (err) {
                    logger.error("删除图片失败，请联系管理员");
                });
            }
        }

        function upload(file) {
            if (!!file) {
                Upload.upload({
                    url: '/api/material/uploadFile/' + vm.materialid,
                    data: { file: file },
                    method: "POST"
                }).then(function (resp) {
                    logger.success("上传图片成功，如果未更新，请刷新页面");
                    vm.currentMaterial.Images = resp.data.Images;
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                    logger.error("上传图片出错，请检查文件是否已存在或超出大小限制");
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        }


        function update() {
            dataservice.updateMaterial(vm.currentMaterial).then(function () {
                logger.success("编辑安装材料成功");
                $state.go("index.material");
            }).catch(function (err) {
                logger.error("编辑安装材料失败，请联系管理员");
            });
        }

        function justUpdate(material) {
            dataservice.updateMaterial(material).then(function () {
                logger.success("删除图片成功");
            }).catch(function (err) {
                logger.error("删除图片失败，请联系管理员");
            });
        }

        function cancel() {
            $state.go("index.material");
        }

        function init() {
            getMaterial();
        }
        init();

    });
