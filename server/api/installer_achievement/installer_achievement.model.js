'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var AchievementSchema = new Schema({
    InstallerNumber:ObjectId,//所属供应商
    ProjectName:String,//项目名称
    ProjectAddress:String,//项目地点
    ProjectMoney:String,//项目合同额
    MoneyType:String,//币种
    ProjectDate:Number,//项目工期
    Partner:String,//合作单位
    Content:String,//项目说明
    CreatedDate:Date,//记录创建时间    
    CreatedPerson:ObjectId//记录创建人
});

module.exports = mongoose.model('Installer_Achievements', AchievementSchema);
