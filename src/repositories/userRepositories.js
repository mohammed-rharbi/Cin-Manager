const User = require('../models/userSchema');




exports.createUser = async (userData)=>{

    const newUser = new User(userData);
    
    return await newUser.save();
}




exports.getUserByEmail = async (userEmail)=>{

    return await  User.findOne({email : userEmail});
     
}

exports.getUserById = async (id)=>{

    return await  User.findOne({_id : id});
}


exports.updateUser = async (id , userData)=>{
    
    return await  User.findByIdAndUpdate(id , userData , {new : true});
}

exports.deleteUser = async (id)=>{

    return await  User.findByIdAndDelete(id);
}

exports.save = async (user)=>{
    return await user.save();
}