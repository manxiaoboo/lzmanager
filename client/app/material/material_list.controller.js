'use strict';

angular.module('inspinia')
    .filter('handlePrice', function() {
       return function(input,number,type){
           if(!number || !type)return input;
           var result_start = [],result_end=[];
           for(var o in input){
                   if(input[o].PriceWithTax>=Number(number)){
                        result_start.push(input[o]);
                    }else if(input[o].PriceWithTax<=Number(number)){
                        result_end.push(input[o]);
                    }
           }
           if(type=="start"){
               return result_start;
           }else if(type=="end"){
               return result_end;
           }else{
               return input;
           }
           
       }
    })
    .controller('MaterialListController', function ($q, $state, $http, dataservice, logger, $uibModal, DTColumnBuilder, DTOptionsBuilder, $compile,Util,$timeout) {

        var vm = this;
        vm.materials;

        vm.createMaterial = createMaterial;
        vm.goInformation = goInformation;
        vm.goUpdate = goUpdate;
        vm.goView = goView;
        vm.deleteMaterial = deleteMaterial;


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
                "search": "搜索"
            },
            autoWidth: true,
            responsive: false
        };

        vm.types = [
            '吊杆','镀锌钢管','方型散流器','防火型风量调节阀','防雨百叶窗','分线盒','分液器（内机用）','分液器（外机用）',
            '风管（含保温）','风口软连接','风量调节阀','回风箱','混凝土基础','控制器线及套管','控制线','控制线及套管',
            '门铰式回风口','排水管','柔性软管','室内机电缆','室内机人工费','室外电缆桥架','室外机电缆','室外机人工费',
            '单层百叶出风口','双层百叶出风口','水管保温','铜管','线管','铜管保温材'
        ];

        vm.exportToExcel = function(tableId) { 
            vm.exportHref = Util.tableToExcel(tableId, 'sheet name');
            $timeout(function() { location.href = vm.exportHref; }, 2000); // trigger download
        }


        function createMaterial() {
            $state.go("index.material_create");
        }

        function listMaterials() {
            dataservice.listMaterial().then(function (datas) {
                for (var o in datas) {
                    datas[o].Area = datas[o].AreaProvince + datas[o].AreaCity;
                    var date = new Date(datas[o].UpdateDate);
                    datas[o].UpdateDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                }
                vm.materials = datas;
                console.info(vm.materials);
            }).catch(function (err) {
                logger.error("获取安装材料列表失败，请联系管理员");
            });
        }

        function deleteMaterial(id) {
            if (confirm("确认删除此条记录吗？")) {
                dataservice.deleteMaterial(id).then(function (datas) {
                    logger.success("删除安装材料成功");
                    init();
                }).catch(function (err) {
                    logger.error("删除安装材料列表失败，请联系管理员");
                });
            }
        }

        function goInformation(id) {
            $state.go("index.material_update", { materialid: id });
        }

        function goUpdate(id) {
            $state.go("index.material_update", { materialid: id });
        }

        function goView(id) {
            $state.go("index.material_view", { materialid: id });
        }

        function init() {
            listMaterials();
        }

        init();
    });
