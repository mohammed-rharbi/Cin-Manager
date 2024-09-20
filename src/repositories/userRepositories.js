const User = require('../models/userSchema');




exports.createUser = async (userData)=>{

    const newUser = new User(userData);
    
    return await newUser.save();
}



exports.getUserByEmail = async (email)=>{

    return await  User.findOne({email});
     
}
