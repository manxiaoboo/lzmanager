'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var InvestigateSchema = new Schema({
    InstallerNumber:ObjectId,//所属供应商
    ProjectName:String,//项目名称
    ProjectAddress:String,//项目地点
    ProjectMoney:String,//项目合同额
    MoneyType:String,//币种
    InvestigateDate:Date,//考察时间
    InvestigatePerson:String,//考察人
    Technology:String,//技术实力
    Content:String,//评论意见
    CreatedDate:Date,//记录创建时间    
    CreatedPerson:ObjectId//记录创建人
});

module.exports = mongoose.model('Installer_Investigates', InvestigateSchema);
