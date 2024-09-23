const mongoose = require('mongoose');



const showtimeSchema = new mongoose.Schema({

    movie: {type:mongoose.Schema.Types.ObjectId , ref:'Movie' , required:true},
    time: {type:Date , required:true},
    room: {type:mongoose.Schema.Types.ObjectId , ref:'Room' , required:true},
    price: {type:Number , required:true},
    seats: [{type:mongoose.Schema.Types.ObjectId , ref:'Seat' , required:true}],
    Available: {type:Boolean , default:true}

} , {timestamps:true});


module.exports = mongoose.model('Showtime' , showtimeSchema);