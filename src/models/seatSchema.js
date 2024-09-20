const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({


    seateNumber : {type:Number , required:true},
    isAvailable : {type:Boolean , default:false},
    room:{type:mongoose.Schema.Types.ObjectId , ref:'Room' , required:true},

} , {timestamps:true});

module.exports = mongoose.model('Seat' , seatSchema);