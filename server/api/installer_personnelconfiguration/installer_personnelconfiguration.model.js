'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Installer_PersonnelconfigurationsSchema = new Schema({
    InstallerNumber: ObjectId,//所属单位
    TechnicalCount:Number,//技术人员
    ProjectManagerCount:Number,//项目经理总数
    TypeofElectromechanical:Number,//机电类
    TypeofCivil:Number,//土建类
    TechnicalLeaderCount:Number,//技术负责人数
    SecurityOfficerCount:Number,//安全员人数
    ConstructionCount:Number,//施工员人数
    ManufacturingCostCount:Number,//造价员人数
    InspectorCount:Number,//质检员人数
    ArchivistCount:Number,//档案员人数
    MaterialMemberCount:Number,//材料员人数
    SpecialOperationCount:Number,//特种作业人员
    AfterSalesCount:Number,//售后人员数量
    OtherPersonCount:Number,//其他人员数量   
    CreatedDate:Date,//记录创建时间    
    CreatedPerson:ObjectId//记录创建人
});

module.exports = mongoose.model('Installer_Personnelconfigurations', Installer_PersonnelconfigurationsSchema);
