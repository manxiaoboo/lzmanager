'use strict';

(function () {

    /**
     * The Util service is for thin, globally reusable, utility functions
     */
    function UtilService($window) {
        var Util = {
            /**
             * Return a callback or noop function
             *
             * @param  {Function|*} cb - a 'potential' function
             * @return {Function}
             */
            safeCb(cb) {
                return (angular.isFunction(cb)) ? cb : angular.noop;
            },

            /**
             * Parse a given url with the use of an anchor element
             *
             * @param  {String} url - the url to parse
             * @return {Object}     - the parsed url, anchor element
             */
            urlParse(url) {
                var a = document.createElement('a');
                a.href = url;

                // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
                if (a.host === '') {
                    a.href = a.href;
                }

                return a;
            },

            /**
             * Test whether or not a given url is same origin
             *
             * @param  {String}           url       - url to test
             * @param  {String|String[]}  [origins] - additional origins to test against
             * @return {Boolean}                    - true if url is same origin
             */
            isSameOrigin(url, origins) {
                url = Util.urlParse(url);
                origins = (origins && [].concat(origins)) || [];
                origins = origins.map(Util.urlParse);
                origins.push($window.location);
                origins = origins.filter(function (o) {
                    return url.hostname === o.hostname &&
                        url.port === o.port &&
                        url.protocol === o.protocol;
                });
                return (origins.length >= 1);
            },

            tableToExcel(tableId,worksheetName) {
                var uri='data:application/vnd.ms-excel;base64,',
                template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
                format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
                var table = $(tableId),
                    ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                    console.info(href);
                return href;
            },

            getUserPermission() {
                return [{
                    label: '权限树',
                    value: '1',
                    children: [
                        {
                            label: "安装商信息",
                            value: "installer",
                            children: [
                                {
                                    label: '安装商信息-查看',
                                    children: [
                                        {
                                            label: "安装商基本信息",
                                            selected: true,
                                            value: "installer_information"
                                        },
                                        {
                                            label: "人员配置情况",
                                            selected: false,
                                            value: "personnelconfiguration_information"
                                        },
                                        {
                                            label: "业务联系人",
                                            selected: false,
                                            value: "businesscontact_information"
                                        },
                                        {
                                            label: "合作经历",
                                            selected: false,
                                            value: "cooperation_information"
                                        },
                                        {
                                            label: "单位业绩",
                                            selected: false,
                                            value: "achievement_information"
                                        },
                                        {
                                            label: "考察情况",
                                            selected: false,
                                            value: "investigate_information"
                                        },
                                        {
                                            label: "附件管理",
                                            selected: false,
                                            value: "files_information"
                                        }
                                    ]
                                },
                                {
                                    label: '安装商信息-编辑',
                                    children: [
                                        {
                                            label: '新建-安装商',
                                            selected: false,
                                            value: "installer_create"
                                        },
                                        {
                                            label: '编辑-安装商',
                                            selected: false,
                                            value: "installer_update"
                                        },
                                        {
                                            label: '新建-人员配置情况',
                                            selected: false,
                                            value: "personnelconfiguration_create"
                                        },
                                        {
                                            label: '编辑-人员配置情况',
                                            selected: false,
                                            value: "personnelconfiguration_update"
                                        },
                                        {
                                            label: '新建-业务联系人',
                                            selected: false,
                                            value: "businesscontact_create"
                                        },
                                        {
                                            label: '编辑-业务联系人',
                                            selected: false,
                                            value: "businesscontact_update"
                                        },
                                        {
                                            label: '删除-业务联系人',
                                            selected: false,
                                            value: "businesscontact_delete"
                                        },
                                        {
                                            label: "新建-合作经历",
                                            selected: false,
                                            value: "cooperation_create"
                                        },
                                        {
                                            label: "编辑-合作经历",
                                            selected: false,
                                            value: "cooperation_update"
                                        },
                                        {
                                            label: "删除-合作经历",
                                            selected: false,
                                            value: "cooperation_delete"
                                        },
                                        {
                                            label: "新建-单位业绩",
                                            selected: false,
                                            value: "achievement_create"
                                        },
                                        {
                                            label: "编辑-单位业绩",
                                            selected: false,
                                            value: "achievement_update"
                                        },
                                        {
                                            label: "删除-单位业绩",
                                            selected: false,
                                            value: "achievement_delete"
                                        },
                                        {
                                            label: "新建-考察情况",
                                            selected: false,
                                            value: "investigate_create"
                                        },
                                        {
                                            label: "编辑-考察情况",
                                            selected: false,
                                            value: "investigate_update"
                                        },
                                        {
                                            label: "删除-考察情况",
                                            selected: false,
                                            value: "investigate_delete"
                                        },
                                        {
                                            label: "上传附件",
                                            selected: false,
                                            value: "files_upload"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: "系统设置",
                            value: "settings",
                            children: [
                                {
                                    label: '用户管理',
                                    selected: false,
                                    value: "users"
                                },
                                {
                                    label: '操作日志',
                                    selected: false,
                                    value: "logs"
                                },
                                {
                                    label: '更改密码',
                                    selected: true,
                                    value: "changepassword"
                                }
                            ]
                        },
                        {
                            label: "安装材料信息",
                            value: "material",
                            children: [
                                {
                                    label: '安装材料信息-查看',
                                    children: [
                                        {
                                            label: "安装材料基本信息",
                                            selected: true,
                                            value: "material_information"
                                        }
                                    ]
                                },
                                {
                                    label: '安装材料信息-编辑',
                                    children: [
                                        {
                                            label: "新建-安装材料",
                                            selected: false,
                                            value: "material_create"
                                        },
                                        {
                                            label: "编辑-安装材料",
                                            selected: false,
                                            value: "material_update"
                                        },
                                        {
                                            label: "删除-安装材料",
                                            selected: false,
                                            value: "material_delete"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }];
            },
            getAdminPermission() {
                return [{
                    label: '权限树',
                    value: '1',
                    children: [
                        {
                            label: "安装商信息",
                            value: "installer",
                            children: [
                                {
                                    label: '安装商信息-查看',
                                    children: [
                                        {
                                            label: "安装商基本信息",
                                            selected: true,
                                            value: "installer_information"
                                        },
                                        {
                                            label: "人员配置情况",
                                            selected: true,
                                            value: "personnelconfiguration_information"
                                        },
                                        {
                                            label: "业务联系人",
                                            selected: true,
                                            value: "businesscontact_information"
                                        },
                                        {
                                            label: "合作经历",
                                            selected: true,
                                            value: "cooperation_information"
                                        },
                                        {
                                            label: "单位业绩",
                                            selected: true,
                                            value: "achievement_information"
                                        },
                                        {
                                            label: "考察情况",
                                            selected: true,
                                            value: "investigate_information"
                                        },
                                        {
                                            label: "附件管理",
                                            selected: true,
                                            value: "files_information"
                                        }
                                    ]
                                },
                                {
                                    label: '安装商信息-编辑',
                                    children: [
                                        {
                                            label: '新建-安装商',
                                            selected: true,
                                            value: "installer_create"
                                        },
                                        {
                                            label: '编辑-安装商',
                                            selected: true,
                                            value: "installer_update"
                                        },
                                        {
                                            label: '新建-人员配置情况',
                                            selected: true,
                                            value: "personnelconfiguration_create"
                                        },
                                        {
                                            label: '编辑-人员配置情况',
                                            selected: true,
                                            value: "personnelconfiguration_update"
                                        },
                                        {
                                            label: '新建-业务联系人',
                                            selected: true,
                                            value: "businesscontact_create"
                                        },
                                        {
                                            label: '编辑-业务联系人',
                                            selected: true,
                                            value: "businesscontact_update"
                                        },
                                        {
                                            label: '删除-业务联系人',
                                            selected: true,
                                            value: "businesscontact_delete"
                                        },
                                        {
                                            label: "新建-合作经历",
                                            selected: true,
                                            value: "cooperation_create"
                                        },
                                        {
                                            label: "编辑-合作经历",
                                            selected: true,
                                            value: "cooperation_update"
                                        },
                                        {
                                            label: "删除-合作经历",
                                            selected: true,
                                            value: "cooperation_delete"
                                        },
                                        {
                                            label: "新建-单位业绩",
                                            selected: true,
                                            value: "achievement_create"
                                        },
                                        {
                                            label: "编辑-单位业绩",
                                            selected: true,
                                            value: "achievement_update"
                                        },
                                        {
                                            label: "删除-单位业绩",
                                            selected: true,
                                            value: "achievement_delete"
                                        },
                                        {
                                            label: "新建-考察情况",
                                            selected: true,
                                            value: "investigate_create"
                                        },
                                        {
                                            label: "编辑-考察情况",
                                            selected: true,
                                            value: "investigate_update"
                                        },
                                        {
                                            label: "删除-考察情况",
                                            selected: true,
                                            value: "investigate_delete"
                                        },
                                        {
                                            label: "上传附件",
                                            selected: true,
                                            value: "files_upload"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: "系统设置",
                            value: "settings",
                            children: [
                                {
                                    label: '用户管理',
                                    selected: true,
                                    value: "users"
                                },
                                {
                                    label: '操作日志',
                                    selected: true,
                                    value: "logs"
                                },
                                {
                                    label: '更改密码',
                                    selected: true,
                                    value: "changepassword"
                                }
                            ]
                        },
                        {
                            label: "安装材料信息",
                            value: "material",
                            children: [
                                {
                                    label: '安装材料信息-查看',
                                    children: [
                                        {
                                            label: "安装材料基本信息",
                                            selected: true,
                                            value: "material_information"
                                        }
                                    ]
                                },
                                {
                                    label: '安装材料信息-编辑',
                                    children: [
                                        {
                                            label: "新建-安装材料",
                                            selected: true,
                                            value: "material_create"
                                        },
                                        {
                                            label: "编辑-安装材料",
                                            selected: true,
                                            value: "material_update"
                                        },
                                        {
                                            label: "删除-安装材料",
                                            selected: true,
                                            value: "material_delete"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }];
            }

        };

        return Util;
    }

    angular.module('inspinia')
        .factory('Util', UtilService);

})();
