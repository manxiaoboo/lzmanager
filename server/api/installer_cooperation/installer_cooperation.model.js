'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var CooperationSchema = new Schema({
    InstallerNumber:ObjectId,//所属供应商
    ProjectName:String,//项目名称
    ProjectAddress:String,//项目地点
    ProjectMoney:String,//项目合同额
    MoneyType:String,//币种
    ProjectCreateDate:Date,//合同签订日期
    ProjectStartDate:Date,//开工日期
    ProjectEndDate:Date,//竣工日期
    Content:String,//项目说明
    CreatedDate:Date,//记录创建时间    
    CreatedPerson:ObjectId//记录创建人
});

module.exports = mongoose.model('Installer_Cooperations', CooperationSchema);
