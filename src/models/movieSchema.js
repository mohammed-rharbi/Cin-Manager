const mongoose = require('mongoose');





const movieSchema = new mongoose.Schema({

    title: {type:String , required:true},
    description: {type:String , required:true},
    image: {type:String , required:true},
    duration:{type:Number , required:true},
    relseDate:{type:Date , required:true}
} , {timestamps:true});



module.exports = mongoose.model('Movie' , movieSchema);