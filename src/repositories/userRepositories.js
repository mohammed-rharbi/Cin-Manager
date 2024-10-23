const User = require('../models/userSchema');




exports.createUser = async (userData)=>{

    const newUser = new User(userData);
    
    return await newUser.save();
}




exports.getUserByEmail = async (email)=>{

    return await  User.findOne({email : email});
     
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


exports.getAllCustomers = async () => {

    return await User.find({role:'customer'});
}


exports.getAllAdmins = async () => {

    return await User.find({role:'admin'});
}

exports.userProfileUpdate = async (userId , data)=>{

    
    return await User.findByIdAndUpdate(userId , data , {new:true})
    
}

