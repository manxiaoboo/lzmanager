(function() {
  'use strict';

  angular
    .module('inspinia')
    .config(routerConfig)
    .factory('authInterceptor', function ($rootScope, $q, $cookies, $injector) {
    var state;
    return {
        // Add authorization token to headers
        request: function (config) {
            config.headers = config.headers || {};
            if ($cookies.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookies.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function (response) {
            if (response.status === 401) {
                (state || (state = $injector.get('$state'))).go('index.login');
                // remove any stale tokens
                $cookies.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})
.run(function ($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in
   
});

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider,$httpProvider,$locationProvider) {
    $stateProvider
      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "app/components/common/content.html"
      })
      .state('index.main', {
        url: "/main",
        templateUrl: "app/main/main.html"
      })
      .state('index.installer_info', {
        url: "/installer_info/:infoid",
        templateUrl: "app/installer/installer_information.html",
        controller:"InstallerInformationController as ins_info"
      })
      .state('index.installer_create', {
        url: "/installer_create",
        templateUrl: "app/installer/installer_create.html",
        controller:"InstallerCreateController as ins_create"
      })
      .state('index.installer_list', {
        url: "/installer_list",
        templateUrl: "app/installer/installer_list.html",
        controller:"InstallerListController as ins_list"
      })
      .state('index.installer_update', {
        url: "/installer_update/:infoid",
        templateUrl: "app/installer/installer_update.html",
        controller:"InstallerUpdateController as ins_update",
        authenticate: 'admin'
      })
      .state('index.personnelconfiguration_create', {
        url: "/personnelconfiguration_create/:infoid",
        templateUrl: "app/installer/personnelconfiguration/configuration_create.html",
        controller:"PersonnelconfigurationCreateController as pc_create",
        authenticate: 'admin'
      })
      .state('index.personnelconfiguration_update', {
        url: "/personnelconfiguration_update/:configid",
        templateUrl: "app/installer/personnelconfiguration/configuration_update.html",
        controller:"PersonnelconfigurationUpdateController as pu_update",
        authenticate: 'admin'
      })
      .state('index.businesscontact_create', {
        url: "/businesscontact_create/:infoid",
        templateUrl: "app/installer/businesscontact/contact_create.html",
        controller:"BusinesscontactCreateController as bc_create",
        authenticate: 'admin'
      })
      .state('index.businesscontact_update', {
        url: "/businesscontact_update/:contactid",
        templateUrl: "app/installer/businesscontact/contact_update.html",
        controller:"BusinesscontactUpdateController as bu_update",
        authenticate: 'admin'
      })
      .state('index.cooperation_create', {
        url: "/cooperation_create/:infoid",
        templateUrl: "app/installer/cooperation/cooperation_create.html",
        controller:"CooperationCreateController as cc_create",
        authenticate: 'admin'
      })
      .state('index.cooperation_update', {
        url: "/cooperation_update/:cooperationid",
        templateUrl: "app/installer/cooperation/cooperation_update.html",
        controller:"CooperationUpdateController as cu_update",
        authenticate: 'admin'
      })
      .state('index.achievement_create', {
        url: "/achievement_create/:infoid",
        templateUrl: "app/installer/achievement/achievement_create.html",
        controller:"AchievementCreateController as ac_create",
        authenticate: 'admin'
      })
      .state('index.achievement_update', {
        url: "/achievement_update/:achievementid",
        templateUrl: "app/installer/achievement/achievement_update.html",
        controller:"AchievementUpdateController as au_update",
        authenticate: 'admin'
      })
      .state('index.investigate_create', {
        url: "/investigate_create/:infoid",
        templateUrl: "app/installer/investigate/investigate_create.html",
        controller:"InvestigateCreateController as ic_create",
        authenticate: 'admin'
      })
      .state('index.investigate_update', {
        url: "/investigate_update/:investigateid",
        templateUrl: "app/installer/investigate/investigate_update.html",
        controller:"InvestigateUpdateController as iu_update",
        authenticate: 'admin'
      })
      .state('index.files', {
        url: "/files/:infoid",
        templateUrl: "app/installer/files/files.html",
        controller:"FilesController as files"
      })
       .state('index.material', {
        url: "/material",
        templateUrl: "app/material/material_list.html",
        controller:"MaterialListController as material"
      })
      .state('index.material_create', {
        url: "/material_create",
        templateUrl: "app/material/material_create.html",
        controller:"MaterialCreateController as mc_create"
      })
       .state('index.material_update', {
        url: "/material_update/:materialid",
        templateUrl: "app/material/material_update.html",
        controller:"MaterialUpdateController as mu_update"
      })
      .state('index.material_view', {
        url: "/material_view/:materialid",
        templateUrl: "app/material/material_view.html",
        controller:"MaterialViewController as mv_view"
      })
      .state('index.users', {
        url: "/users",
        templateUrl: "app/users/users.html",
        controller:"UsersController as users",
        authenticate: 'admin'
      })
      .state('index.changepassword', {
        url: "/changepassword",
        templateUrl: "app/users/changepassword/changepassword.html",
        controller:"UsersController as users",
        datas:{label:'changepassword'}
      })
       .state('index.customPermissions', {
        url: "/customPermissions/:userid",
        templateUrl: "app/users/custompermissions/custompermissions.html",
        controller:"CustomPermissionsController as cp",
        authenticate: 'admin'
      })
      .state('index.profile', {
        url: "/profile",
        templateUrl: "app/profile/profile.html",
        controller:"ProfileController as profile"
      })
      .state('index.adduser', {
        url: "/adduser",
        templateUrl: "app/users/adduser/adduser.html",
        controller:"UserAddController as ua",
        authenticate: 'admin'
      })
      .state('index.datamap', {
        url: "/datamap",
        templateUrl: "app/datamap/datamap.html",
        controller:"DataMapController as datamap"
      })
      .state('index.login', {
        url: "/login",
        templateUrl: "app/auth/login/auth_login.html",
        controller:"AuthLoginController as login"
      });

    $urlRouterProvider.otherwise('/index/installer_list');
    $httpProvider.interceptors.push('authInterceptor');
  }

})();
