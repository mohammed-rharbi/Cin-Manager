const userRepositories = require('../repositories/userRepositories');
const bcrypt = require('bcrypt');



exports.register = async (userData)=>{
    
    const {name , email , password} = userData;

    const ISexist = await userRepositories.getUserByEmail(email);
    if(ISexist){

        throw new Error('User already exists');
    }

    const hashPass = await bcrypt.hash(password , 10);

    const newUser = await userRepositories.createUser({ name , email , password : hashPass , role : 'customer' });

    return newUser;
}

