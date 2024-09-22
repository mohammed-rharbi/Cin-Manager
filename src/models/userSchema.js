const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({

    name:{ type:String , required:true},
    email:{type:String , required:true},
    password:{type:String , required:true},
    role:{type:String , enum:['admin' , 'customer'] , default:'customer' , required:true},
    createdBy: {type:mongoose.Schema.Types.ObjectId , ref:'User' , default:null}
},{timestamps:true});

module.exports = mongoose.model('User' , userSchema);