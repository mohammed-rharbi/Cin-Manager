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