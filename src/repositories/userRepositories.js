const User = require('../models/userSchema');




exports.createUser = async (userData)=>{

    const newUser = new User(userData);
    
    return await newUser.save();
}




exports.getUserByEmail = async (email)=>{

    return await  User.findOne({email});
     
}

exports.getUserById = async (id)=>{

    return await  User.findOne({id});
}


exports.updateUser = async (id , userData)=>{
    
    return await  User.findByIdAndUpdate(id , userData , {new : true});
}

exports.deleteUser = async (id)=>{

    return await  User.findByIdAndDelete(id);
}