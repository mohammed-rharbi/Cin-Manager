const { date } = require('joi');
const mongoose = require('mongoose');



const showtimeSchema = new mongoose.Schema({

    movie: {type:mongoose.Schema.Types.ObjectId , ref:'Movie' , required:true},
    time: {type:date , required:true},
    room: {type:mongoose.Schema.Types.ObjectId , ref:'Room' , required:true},
    price: {type:Number , required:true}

} , {timestamps:true});


module.exports = mongoose.model('Showtime' , showtimeSchema);