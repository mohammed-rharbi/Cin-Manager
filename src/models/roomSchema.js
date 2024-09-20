const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({

    name: {type:String , required:true},
    capacity: {type:number , required:true},
    type: {type:String , required:true},
    image: {type:String , required:false},
    description: {type:String , required:false}

} , {timestamps:true});

module.exports = mongoose.model('Room' , roomSchema);