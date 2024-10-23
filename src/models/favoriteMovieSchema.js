const mongoose = require('mongoose');



const favoriteMovieSchema = new mongoose.Schema({

    user: {type:mongoose.Schema.Types.ObjectId , ref:'User' , required:true},
    movies: [ {type:mongoose.Schema.Types.ObjectId , ref:'Movie'}],

} , {timestamps:true});



module.exports = mongoose.model('FavoriteMovie' , favoriteMovieSchema);
