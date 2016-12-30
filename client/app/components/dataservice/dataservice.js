'use strict';
(function () {

    angular.module('inspinia')
        .factory('dataservice', dataservice);


    function dataservice($q, $http, $rootScope, $timeout) {
        var localCache = {};

        return {
            createInstaller: createInstaller,
            listInstaller: listInstaller,
            getInstaller: getInstaller,
            updateInstaller: updateInstaller,
            createInstaller_Personnelconfigurations: createInstaller_Personnelconfigurations,
            getInstaller_PersonnelconfigurationByInstallerId: getInstaller_PersonnelconfigurationByInstallerId,
            updateInstaller_Personnelconfiguration: updateInstaller_Personnelconfiguration,
            getInstaller_PersonnelconfigurationById: getInstaller_PersonnelconfigurationById,
            createInstaller_Businesscontact: createInstaller_Businesscontact,
            getInstaller_BusinesscontactById: getInstaller_BusinesscontactById,
            getInstaller_BusinesscontactByInstallerId: getInstaller_BusinesscontactByInstallerId,
            updateInstaller_Businesscontact: updateInstaller_Businesscontact,
            deleteInstaller_Businesscontact:deleteInstaller_Businesscontact,
            getUsersList: getUsersList,
            getUser: getUser,
            changePermissions: changePermissions,
            createMemo:createMemo,
            listMemos:listMemos,
            deleteMemo:deleteMemo,
            getInstaller_CooperationsByInstaller:getInstaller_CooperationsByInstaller,
            createInstaller_Cooperation:createInstaller_Cooperation,
            getInstaller_CooperationById:getInstaller_CooperationById,
            updateInstaller_Cooperation:updateInstaller_Cooperation,
            deleteInstaller_Cooperation:deleteInstaller_Cooperation,
            getInstaller_AchievementsByInstaller:getInstaller_AchievementsByInstaller,
            getInstaller_AchievementById:getInstaller_AchievementById,
            createInstaller_Achievement:createInstaller_Achievement,
            updateInstaller_Achievement:updateInstaller_Achievement,
            deleteInstaller_Achievement:deleteInstaller_Achievement,
            getInstaller_InvestigatesByInstaller:getInstaller_InvestigatesByInstaller,
            getInstaller_InvestigateById:getInstaller_InvestigateById,
            createInstaller_Investigate:createInstaller_Investigate,
            updateInstaller_Investigate:updateInstaller_Investigate,
            deleteInstaller_Investigate:deleteInstaller_Investigate,
            getInstaller_FilesByInstaller:getInstaller_FilesByInstaller,
            deleteInstaller_Files:deleteInstaller_Files,
            createMaterial:createMaterial,
            listMaterial:listMaterial,
            getMaterial:getMaterial,
            updateMaterial:updateMaterial,
            Material_deleteImage:Material_deleteImage,
            deleteMaterial:deleteMaterial
        };

        function createInstaller(ins) {
            var url = '/api/installer';
            return httpPost(url, ins);
        }

        function listInstaller() {
            var url = '/api/installer';
            return httpGet(url);
        }

        function getInstaller(id) {
            var url = '/api/installer/' + id;
            return httpGet(url);
        }

        function updateInstaller(ins) {
            var url = '/api/installer';
            return httpSave(url, ins);
        }

        function createInstaller_Personnelconfigurations(pc) {
            var url = '/api/installer_personnelconfiguration';
            return httpPost(url, pc);
        }

        function getInstaller_PersonnelconfigurationById(id) {
            var url = '/api/installer_personnelconfiguration/' + id;
            return httpGet(url);
        }

        function getInstaller_PersonnelconfigurationByInstallerId(id) {
            var url = '/api/installer_personnelconfiguration/getByInstallerId/' + id;
            return httpGet(url);
        }

        function updateInstaller_Personnelconfiguration(pc) {
            var url = '/api/installer_personnelconfiguration';
            return httpSave(url, pc);
        }

        function createInstaller_Businesscontact(bc) {
            var url = '/api/installer_businesscontact';
            return httpPost(url, bc);
        }

        function getInstaller_BusinesscontactById(id) {
            var url = '/api/installer_businesscontact/' + id;
            return httpGet(url);
        }

        function getInstaller_BusinesscontactByInstallerId(id) {
            var url = '/api/installer_businesscontact/getByInstallerId/' + id;
            return httpGet(url);
        }

        function updateInstaller_Businesscontact(bc) {
            var url = '/api/installer_businesscontact';
            return httpSave(url, bc);
        }

        function deleteInstaller_Businesscontact(id){
            var url = '/api/installer_businesscontact/'+id;
            return httpDelete(url);
        }

        function getUsersList() {
            var url = '/api/users';
            return httpGet(url);
        }

        function getUser(id) {
            var url = '/api/users/' + id;
            return httpGet(url);
        }

        function changePermissions(id, cp) {
            var url = '/api/users/' + id + '/customPermissions';
            return httpPost(url, cp);
        }

        function createMemo(memo) {
            var url = '/api/memo';
            return httpSave(url, memo);
        }

        function listMemos(userid){
            var url = '/api/memo/getByCreatedPerson/'+userid;
            return httpGet(url);
        }

        function deleteMemo(id){
            var url = '/api/memo/'+id;
            return httpDelete(url);
        }

        function getInstaller_CooperationsByInstaller(id){
            var url = '/api/installer_cooperation/getByInstaller/'+id;
            return httpGet(url);
        }

        function getInstaller_CooperationById(id){
            var url = '/api/installer_cooperation/'+id;
            return httpGet(url);
        }

        function createInstaller_Cooperation(cc) {
            var url = '/api/installer_cooperation';
            return httpPost(url, cc);
        }

        function updateInstaller_Cooperation(cc) {
            var url = '/api/installer_cooperation';
            return httpSave(url, cc);
        }

        function deleteInstaller_Cooperation(id){
            var url = '/api/installer_cooperation/'+id;
            return httpDelete(url);
        }

        function getInstaller_AchievementsByInstaller(id){
            var url = '/api/installer_achievement/getByInstaller/'+id;
            return httpGet(url);
        }

        function getInstaller_AchievementById(id){
            var url = '/api/installer_achievement/'+id;
            return httpGet(url);
        }

        function createInstaller_Achievement(ac) {
            var url = '/api/installer_achievement';
            return httpPost(url, ac);
        }

        function updateInstaller_Achievement(au) {
            var url = '/api/installer_achievement';
            return httpSave(url, au);
        }

        function deleteInstaller_Achievement(id){
            var url = '/api/installer_achievement/'+id;
            return httpDelete(url);
        }

        function getInstaller_InvestigatesByInstaller(id){
            var url = '/api/installer_investigate/getByInstaller/'+id;
            return httpGet(url);
        }

        function getInstaller_InvestigateById(id){
            var url = '/api/installer_investigate/'+id;
            return httpGet(url);
        }

        function createInstaller_Investigate(ic) {
            var url = '/api/installer_investigate';
            return httpPost(url, ic);
        }

        function updateInstaller_Investigate(iu) {
            var url = '/api/installer_investigate';
            return httpSave(url, iu);
        }

        function deleteInstaller_Investigate(id){
            var url = '/api/installer_investigate/'+id;
            return httpDelete(url);
        }

        function getInstaller_FilesByInstaller(id) {
            var url = '/api/installer_files/getByInstaller/'+id;
            return httpGet(url);
        }

        function deleteInstaller_Files(id){
            var url = '/api/installer_files/'+id;
            return httpDelete(url);
        }

        function createMaterial(mate) {
            var url = '/api/material';
            return httpPost(url, mate);
        }

        function listMaterial() {
            var url = '/api/material';
            return httpGet(url);
        }

        function getMaterial(id) {
            var url = '/api/material/' + id;
            return httpGet(url);
        }

        function updateMaterial(mate) {
            var url = '/api/material';
            return httpSave(url, mate);
        }

        function Material_deleteImage(material,key){
            var url = '/api/material/deleteFile/'+key;
            return httpPost(url,material);
        }

        function deleteMaterial(id) {
            var url = '/api/material/' + id;
            return httpDelete(url);
        }





        function httpGet(url, useCache) {
            if (useCache && localCache[url]) {
                return $q.when(localCache[url]);
            }

            var deferred = $q.defer();
            console.log('------------get-----' + url);
            $http.get(url)
                .success(function (data) {
                    if (useCache) localCache[url] = data;
                    $timeout(function () {
                        deferred.resolve(data);
                    }, 1);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                })

            return deferred.promise;
        }

        function httpPost(url, jsondata) {
            var deferred = $q.defer();
            console.log('------------post-----' + url);
            $http.post(url, jsondata)
                .success(function (resp) {
                    deferred.resolve(resp);
                }).error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function httpSave(url, item) {
            var deferred = $q.defer();
            if (!item._id) {
                console.log('------------post-----' + url);
                $http.post(url, item)
                    .success(function (p) {
                        deferred.resolve(p);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
            } else {
                console.log('------------put-----' + url);
                url = url + '/' + item._id;
                $http.put(url, item)
                    .success(function (p) {
                        deferred.resolve(p);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
            }
            return deferred.promise;
        }

        function httpDelete(url) {
            console.log('------------delete-----' + url);
            var deferred = $q.defer();
            $http.delete(url)
                .success(function (p) {
                    deferred.resolve(p);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

    };




})();