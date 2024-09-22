const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({

    name: {type:String , required:true},
    capacity: {type:Number , required:true},
    type: {type:String ,enum:['normal' , 'vip' , '3D'] , default:'normal' , required:true},
    seats:[{type:mongoose.Schema.Types.ObjectId , ref:'Seat'}],
    image: {type:String , required:false},
    description: {type:String , required:false}

} , {timestamps:true});

module.exports = mongoose.model('Room' , roomSchema);