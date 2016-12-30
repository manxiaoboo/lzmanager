'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var MaterialsSchema = new Schema({
    MaterialName: String,//材料名称
    MaterialCode: String,//材料编号
    MaterialBrand: String,//材料品牌
    Specification: String,//规格
    Unit: String,//单位
    SupplierType: String,//供应商类别
    PriceWithTax: Number,//含税单价
    PriceNotTax: Number,//不含税单价
    SupplierName: String,//供应商名称
    MaterialType: String,//材料类别
    MaterialLevel:String,//材料级别
    Contacts:String,//联系人
    RegistrationDate:Date,//登记日期
    UpdateDate:Date,//更新日期
    Gender:String,//性别
    Record:Number,//使用记录
    Quality:String,//质量评价
    Duty:String,//职务
    AreaProvince:String,//所属区域省
    AreaCity:String,//所属区域市
    Handler:String,//操作人
    Phone:String,//联系电话
    Remarks:String,//备注
    Images:[
        {Name:String,Key:String}
    ],//图片
    CreatedDate:Date,//记录创建时间
    CreatedPerson:ObjectId//记录创建人
});

module.exports = mongoose.model('Materials', MaterialsSchema);
