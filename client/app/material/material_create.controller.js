'use strict';

angular.module('inspinia')
    .controller('MaterialCreateController', function (Auth, dataservice, logger, $state,$scope) {

        var vm = this;
        vm.currentMaterial = {};
        vm.currentUser = Auth.getCurrentUser();
        vm.provinces = cityArr.citys;
        vm.citys = [];


        vm.create = create;
        vm.cancel = cancel;

        vm.types = [
            '吊杆','镀锌钢管','方型散流器','防火型风量调节阀','防雨百叶窗','分线盒','分液器（内机用）','分液器（外机用）',
            '风管（含保温）','风口软连接','风量调节阀','回风箱','混凝土基础','控制器线及套管','控制线','控制线及套管',
            '门铰式回风口','排水管','柔性软管','室内机电缆','室内机人工费','室外电缆桥架','室外机电缆','室外机人工费',
            '单层百叶出风口','双层百叶出风口','水管保温','铜管','线管','铜管保温材'
        ];


        function create() {
            vm.currentMaterial.CreatedPerson = vm.currentUser._id;
            dataservice.createMaterial(vm.currentMaterial).then(function () {
                logger.success("创建安装材料成功");
                $state.go("index.material");
            }).catch(function (err) {
                logger.error("创建安装材料失败，请联系管理员");
            });
        }

          function cancel(){
            $state.go("index.material");
        }

        function init() {
            $scope.$watch('mc_create.currentMaterial.AreaProvince',function(){
                for(var o in vm.provinces){
                    if(vm.provinces[o].name==vm.currentMaterial.AreaProvince){
                        vm.citys = vm.provinces[o].sub;
                    }
                }
            });
        }
        init();

    });
