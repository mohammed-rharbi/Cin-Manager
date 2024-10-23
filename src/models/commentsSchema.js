const mongoose = require('mongoose');



const commentShema = new mongoose.Schema({

    user: {type:mongoose.Schema.Types.ObjectId , ref:'User' },
    movie: {type:mongoose.Schema.Types.ObjectId , ref:'Movie'},
    content: {type:String , required:true }

} , {timestamps:true});



module.exports = mongoose.model('Comment' , commentShema);
