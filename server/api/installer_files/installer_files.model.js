'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var FilesSchema = new Schema({
    InstallerNumber:ObjectId,//所属供应商
    FileName:String,//文件名称
    Key:String,//标识
    CreatedDate:Date,//记录创建时间    
    CreatedPerson:ObjectId//记录创建人
});

module.exports = mongoose.model('Installer_Files', FilesSchema);
