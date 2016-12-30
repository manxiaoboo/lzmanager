'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var InstallersSchema = new Schema({
    InstallerName: String,//单位名称
    CreditCode: String,//信用代码
    LegalPerson: String,//法人代表
    CompanyType: String,//单位类型
    RegisteredCapital: Number,//注册资金
    CompanyCreatedDate: Date,//成立日期
    OperatingPeriodStart: Date,//营业期限起始
    OperatingPeriodEnd:Date,//营业期限截止
    ApprovedDate: Date,//核准日期
    AccountOpening: String,//开户账号
    BankAccount: String,//开户行
    UnitQualification: String,//单位资质
    CompanyAddress:String,//单位地址
    CompanyWebsite:String,//公司网址
    CompanyEmail:String,//公司邮箱
    CompanyContact:String,//联系方式
    BusinessScope:String,//经营范围
    CompanyNumber:String,//单位编号
    RegistrationDate:Date,//登记日期
    UpdateDate:Date,//更新日期
    AreaProvince:String,//所属区域省
    AreaCity:String,//所属区域市
    Office:String,//所属事务所
    Header:String,//负责人
    Level:String,//单位级别
    CreatedDate:Date,//记录创建时间
    CreatedPerson:ObjectId//记录创建人
});

module.exports = mongoose.model('Installers', InstallersSchema);
