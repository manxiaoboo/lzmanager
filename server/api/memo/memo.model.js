'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var MemosSchema = new Schema({
    Rating:Number,
    Content:String,
    CreatedDate:Date,//记录创建时间    
    CreatedPerson:ObjectId//记录创建人
});

module.exports = mongoose.model('Memos', MemosSchema);
