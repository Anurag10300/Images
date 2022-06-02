var mongoose = require('mongoose');
  
var imageSchema = new mongoose.Schema({
    nickName:{
        type:String
    },
    pgName :{
        type:String
    },
    ownerName :{
        type:String
    },
    ownerNumber : {
        type:Number
    } ,
    address: {
        type:String
    },
    rooms: {type: Number},
    kitchen: {type:String},
    mess : {type: String},
    rent : {type : Number},
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('Image', imageSchema);

