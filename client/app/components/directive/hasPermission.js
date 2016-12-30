'use strict';
(function () {
    angular.module('inspinia')
        .directive('hasPermission', function (Auth) {
            return {
                link: function (scope, element, attrs) {
                    Auth.getCurrentUser().then((data) => nextFun(data));
                    function nextFun(data) {
                        var custom = data.customPermissions;
                        var value = attrs.hasPermission.trim();
                        custom.forEach(function (e) {
                            if (value === e.label) {
                                if (!!e.value) {
                                    element.show();
                                } else {
                                    element.hide();
                                }
                            }
                        });
                    }
                }
            }
        })
})();