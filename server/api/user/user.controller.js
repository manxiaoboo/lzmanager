'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import co from 'co';
import multiparty from 'multiparty';
import qiniu from "qiniu";

qiniu.conf.ACCESS_KEY = '8vfLR9ldMXbIUUlDm39FjKuAtCrbeLjl9GZeBufQ';
qiniu.conf.SECRET_KEY = '42beooQFa_D9yjZPNr3YYJMzLXHQOqzJYJQnryk5';
var bucket = 'lzmanager';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function (user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function () {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

export function changePermissions(req, res, next) {
  var userId = req.params.id;
  return User.findById(userId).exec()
    .then(user => {
      user.customPermissions = req.body.customPermissions;
      return user.save()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
}

export function changeHead(req, res, next) {
  var userId = req.user._id;
  var truename = req.params.id;
  var form = new multiparty.Form();
  var diskUrl = "";
  var uploadName = "";
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
      var dstPath = './tempimg/' + truename + ".jpg";//inputFile.originalFilename.split('.')[1]
      diskUrl = dstPath;
      uploadName = truename + ".jpg";
      var is = fs.createReadStream(uploadedPath);
      var os = fs.createWriteStream(dstPath);
      is.pipe(os);
      is.on('end', function () {
        fs.unlinkSync(uploadedPath);
        return User.findById(userId).exec()
          .then(user => {
            user.head = uploadName;
            return user.save()
              .then(() => {
                var token = uptoken(bucket, uploadName);
                uploadFile(token, uploadName, diskUrl);
              })
              .catch(validationError(res));
          });
      });
    }

    function uptoken(bucket, key) {
      var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
      return putPolicy.token();
    }

    function uploadFile(uptoken, key, localFile) {
      var extra = new qiniu.io.PutExtra();
      qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
        if (!err) {
          // 上传成功， 处理返回值
          console.log(ret.hash, ret.key, ret.persistentId);
          var dirList = fs.readdirSync('./tempimg');
            dirList.forEach(function (fileName) {
                fs.unlinkSync('./tempimg/' + fileName);
            });
          res.status(204).end();
        } else {
          // 上传失败， 处理返回代码
          console.log(err);
          validationError(res);
        }
      });
    }
  });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
