'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Installer_BusinesscontactsSchema = new Schema({
    InstallerNumber: ObjectId,//所属单位
    ContactName:String,//姓名
    ContactGender:String,//性别
    ContactDepartment:String,//所在部门
    ContactPost:String,//职务
    ContactPhone1:String,//电话1
    ContactPhone2:String,//电话2
    ContactFax:String,//传真
    ContactEmail:String,//邮箱
    ContactRegistrationDate:Date,//登记日期
    ContactRemarks:String,//备注
    CreatedDate:Date,//记录创建时间    
    CreatedPerson:ObjectId//记录创建人
});

module.exports = mongoose.model('Installer_Businesscontacts', Installer_BusinesscontactsSchema);
