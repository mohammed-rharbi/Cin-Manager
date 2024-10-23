const userRepositories = require('../repositories/userRepositories');
const bcrypt = require('bcrypt');




exports.CreateAdmin = async (AdminData)=>{
    
    const {name , email , password} = AdminData;

    const ISexist = await userRepositories.getUserByEmail(email);

    if(ISexist){

        throw new Error('User already exists');
    }

    const hashPass = await bcrypt.hash(password , 10);

    const newAdmin = await userRepositories.createUser({ name , email , password : hashPass , role : 'admin'});

    return newAdmin;
}

exports.updateAdmin = async (id , userData)=>{


    const {name , email , password} = userData;

    if(password){
        const hashPass = await bcrypt.hash(password , 10);
        userData.password = hashPass;
    }
    
    return await  userRepositories.updateUser(id , userData);
    
}


exports.deleteAdmin = async (id)=>{

    return await  userRepositories.deleteUser(id);
}


exports.getAllCustomers = async ()=>{


    return await userRepositories.getAllCustomers(); 
}


exports.getAllAdmins = async ()=>{


    return await userRepositories.getAllAdmins(); 
}