/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/samplepractitionerss              ->  index
 * POST    /api/samplepractitionerss              ->  create
 * GET     /api/samplepractitionerss/:id          ->  show
 * PUT     /api/samplepractitionerss/:id          ->  update
 * DELETE  /api/samplepractitionerss/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Materials = require('./material.model');
import fs from 'fs';
import co from 'co';
import multiparty from 'multiparty';
import qiniu from "qiniu";


qiniu.conf.ACCESS_KEY = '8vfLR9ldMXbIUUlDm39FjKuAtCrbeLjl9GZeBufQ';
qiniu.conf.SECRET_KEY = '42beooQFa_D9yjZPNr3YYJMzLXHQOqzJYJQnryk5';
var bucket = 'lzmanager';
var imagekey = '';


function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.save()
            .then(function (updated) {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(function () {
                    res.status(204).end();
                });
        }
    };
}

function removeFiles(res) {
    return function (entity) {
        var client = new qiniu.rs.Client();
        var bucket = 'lzmanager';
        client.remove(bucket, imagekey, function (err, ret) {
            if (!err) {
                console.log("delete success");
                var id = entity._id;
                Materials.findByIdAndUpdate(id, { $pull: { Images: { Key: imagekey } } }, function (err, data) {
                    if (err) {
                        res.send(500);
                        console.log(err);
                    } else {
                        res.status(200).json(data);
                    }
                });
            } else {
                if (err.code == '612') {
                    console.log("no file");
                    var id = entity._id;
                    Materials.findByIdAndUpdate(id, { $pull: { Images: { Key: imagekey } } }, function (err, data) {
                        if (err) {
                            res.send(500);
                            console.log(err);
                        } else {
                            res.status(200).json(data);
                        }
                    });
                } else {
                    console.log(err);
                    return entity;
                }
            }
        });
    }
}

function removeMaterial(res) {
    return function (entity) {
        var client = new qiniu.rs.Client();
        var bucket = 'lzmanager';
        var images = entity.Images;
        var index = 0;
        removeFile(images[index]);

        function removeFile(image) {
            client.remove(bucket, image.Key, function (err, ret) {
                if (!err) {
                    console.log("delete success");
                    index++;
                    if (index >= images.length) {
                        entity.removeAsync()
                        .then(function () {
                            res.status(204).end();
                        }).catch(function(){
                            res.status(500).end();
                        });
                    } else {
                        removeFile(images[index]);
                    }
                } else {
                    if (err.code == '612') {
                        console.log("no file");
                        index++;
                        if (index >= images.length) {
                            entity.removeAsync()
                            .then(function () {
                                res.status(204).end();
                            }).catch(function(){
                                res.status(500).end();
                            });
                        } else {
                            removeFile(images[index]);
                        }
                    } else {
                        console.log(err);
                        res.send(500);
                        return entity;
                    }
                }
            });
        }
    }
}

// Gets a list of Samplepractitionerss
exports.index = function (req, res) {
    Materials.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
};


// Gets a single Samplepractitioners from the DB
exports.show = function (req, res) {
    Materials.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Creates a new Samplepractitioners in the DB
exports.create = function (req, res) {
    req.body.CreatedDate = new Date();
    req.body.RegistrationDate = new Date();
    req.body.UpdateDate = new Date();
    Materials.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};

// Updates an existing Samplepractitioners in the DB
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    req.body.UpdateDate = new Date();
    Materials.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

exports.uploadFile = function (req, res) {
    var userId = req.user._id;
    var truename = req.params.id;
    var form = new multiparty.Form();
    var diskUrl = "";
    var uploadName = "";
    var fileName = "";
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            if (!fs.existsSync('./tempimg')) {
                fs.mkdir('./tempimg');
            }
            var dstPath = './tempimg/' + truename + inputFile.originalFilename;//inputFile.originalFilename.split('.')[1]
            fileName = inputFile.originalFilename;
            diskUrl = dstPath;
            uploadName = truename + inputFile.originalFilename;
            Materials.findById(truename).exec()
                .then(material => {
                    if (!!material) {
                        var is = fs.createReadStream(uploadedPath);
                        var os = fs.createWriteStream(dstPath);
                        is.pipe(os);
                        is.on('end', function () {
                            fs.unlinkSync(uploadedPath);
                            return uploadFile(uptoken(bucket, uploadName), uploadName, diskUrl, material);
                        });
                    } else {
                        res.status(403).end();
                    }
                })
                .catch(err => next(err));
        }

        function uptoken(bucket, key) {
            var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
            return putPolicy.token();
        }

        function uploadFile(uptoken, key, localFile, material) {
            var extra = new qiniu.io.PutExtra();
            qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
                if (!err) {
                    // 上传成功， 处理返回值
                    console.log(ret.hash, ret.key, ret.persistentId);
                    var dirList = fs.readdirSync('./tempimg');
                    dirList.forEach(function (fileName) {
                        fs.unlinkSync('./tempimg/' + fileName);
                    });
                    material.Images.push({ Name: fileName, Key: key });
                    material.save()
                        .then(responseWithResult(res, 201))
                        .catch(handleError(res));
                } else {
                    // 上传失败， 处理返回代码
                    console.log(err);
                    handleError(res);
                }
            });
        }
    });
};

exports.deleteFile = function (req, res) {
    imagekey = req.params.key;
    var materialid = req.body._id;
    Materials.findByIdAsync(materialid)
        .then(handleEntityNotFound(res))
        .then(removeFiles(res))
        .then(responseWithResult(res))
        .catch(handleError(res));

}

// Deletes a Samplepractitioners from the DB
exports.destroy = function (req, res) {
    Materials.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeMaterial(res))
        .catch(handleError(res));
};
