'use strict';

angular.module('inspinia')
    .controller('DataMapController', function ($scope, $rootScope, $http, dataservice,logger) {
        var vm = this;
        vm.lineConfig = {
            theme: 'default',
            event: [],
            dataLoaded: true
        };

        vm.lineOption = {
            title: {
                text: '安装商数据分布',
                subtext: '以省为单位计数',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['安装商']
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '安装商',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: [
                    ]
                }
            ]
        };
        function init() {
            dataservice.listInstaller().then(function (datas) {
                var mapdatas = {};
                for(var o in datas){
                    if(!mapdatas[datas[o].AreaProvince]){
                        mapdatas[datas[o].AreaProvince] = 1;
                    }else{
                        mapdatas[datas[o].AreaProvince]++;
                    }
                }
                for(var i in mapdatas){
                    vm.lineOption.series[0].data.push({name:i,value:mapdatas[i]});
                }
                
                logger.info("安装商列表获取成功");
            }).catch(function (err) {
                logger.error("获取安装商列表失败，请联系管理员");
            });
        }
        init();

    });
