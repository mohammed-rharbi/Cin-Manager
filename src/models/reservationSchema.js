const mongoose = require('mongoose');


const reservationSchema = new mongoose.Schema({

    user: {type:mongoose.Schema.Types.ObjectId , ref:'User' , required:true},
    movie: {type:mongoose.Schema.Types.ObjectId , ref:'Movie' , required:true},
    showtime: {type:mongoose.Schema.Types.ObjectId , ref:'Showtime' , required:true},
    seat: {type:mongoose.Schema.Types.ObjectId , ref:'Seat' , required:true}

} , {timestamps:true});

module.exports = mongoose.model('Reservation' , reservationSchema);