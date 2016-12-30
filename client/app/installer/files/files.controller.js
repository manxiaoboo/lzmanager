'use strict';

angular.module('inspinia')
    .controller('FilesController', function (Auth, dataservice, logger, $state, $stateParams, Upload, lodash) {

        var vm = this;
        vm.currentUser = Auth.getCurrentUser();
        vm.infoid = $stateParams.infoid;
        vm.upload = upload;
        vm.deleteFile = deleteFile;
        vm.files;
        vm.type;

        function init() {
            getInstaller_FilesByInstaller();
        }
        init();

        function getInstaller_FilesByInstaller() {
            dataservice.getInstaller_FilesByInstaller(vm.infoid).then(function (datas) {
                vm.files = datas;
                bindData(vm.files);
            });
        }

        function bindData(files) {
            for (var o in files) {
                if (lodash.endsWith(lodash.toLower(files[o].FileName), '.jpg')
                    || lodash.endsWith(lodash.toLower(files[o].FileName), '.png')
                    || lodash.endsWith(lodash.toLower(files[o].FileName), '.gif')
                    || lodash.endsWith(lodash.toLower(files[o].FileName), '.jpeg')) {
                    files[o].type = "img";
                    files[o].imgUrl = "http://oh4l42l8h.bkt.clouddn.com/" + files[o].Key;
                } else if (lodash.endsWith(lodash.toLower(files[o].FileName), '.zip') || lodash.endsWith(lodash.toLower(files[o].FileName), '.rar')) {
                    files[o].type = "zip";
                    files[o].downloadurl = "http://oh4l42l8h.bkt.clouddn.com/" + files[o].Key;
                } else if (lodash.endsWith(lodash.toLower(files[o].FileName), '.doc') || lodash.endsWith(lodash.toLower(files[o].FileName), '.docx')) {
                    files[o].type = "word";
                    files[o].downloadurl = "http://oh4l42l8h.bkt.clouddn.com/" + files[o].Key;
                } else if (lodash.endsWith(lodash.toLower(files[o].FileName), '.xls') || lodash.endsWith(lodash.toLower(files[o].FileName), '.xlsx')) {
                    files[o].type = "excel";
                    files[o].downloadurl = "http://oh4l42l8h.bkt.clouddn.com/" + files[o].Key;
                } else if (lodash.endsWith(lodash.toLower(files[o].FileName), '.txt')) {
                    files[o].type = "text";
                    files[o].downloadurl = "http://oh4l42l8h.bkt.clouddn.com/" + files[o].Key;
                } else if (lodash.endsWith(lodash.toLower(files[o].FileName), '.mp3') || lodash.endsWith(lodash.toLower(files[o].FileName), '.wav') ||
                           lodash.endsWith(lodash.toLower(files[o].FileName), '.wma') ) {
                    files[o].type = "music";
                    files[o].downloadurl = "http://oh4l42l8h.bkt.clouddn.com/" + files[o].Key;
                } else if (lodash.endsWith(lodash.toLower(files[o].FileName), '.mp4') || lodash.endsWith(lodash.toLower(files[o].FileName), '.rmvb') ||
                           lodash.endsWith(lodash.toLower(files[o].FileName), '.avi') || lodash.endsWith(lodash.toLower(files[o].FileName), '.rm')) {
                    files[o].type = "video";
                    files[o].downloadurl = "http://oh4l42l8h.bkt.clouddn.com/" + files[o].Key;
                } else{
                    files[o].type = "file";
                    files[o].downloadurl = "http://oh4l42l8h.bkt.clouddn.com/" + files[o].Key;
                }
            }
        }

        function upload(file) {
            if (!!file) {
                Upload.upload({
                    url: '/api/installer_files/uploadFile/' + vm.infoid,
                    data: { file: file },
                    method: "POST"
                }).then(function (resp) {
                    logger.success("上传附件成功，如果未更新，请刷新页面");
                    init();
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                    logger.error("上传文件出错，请检查文件是否已存在或超出大小限制");
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        }

        function deleteFile(id){
            dataservice.deleteInstaller_Files(id).then(function(data){
                logger.success("删除附件成功");
                init();
            }).catch(function(err){
                logger.error("删除附件失败，请联系管理员");
                console.error(err);
            });
        }

    });
