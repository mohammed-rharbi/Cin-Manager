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

exports.login = async (userData)=>{

    const {email , password} = userData;


    const user = await userRepositories.getUserByEmail(email);
    if(!user) throw new Error('user not found');


    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch) throw new Error('invalid credentials');


    return user;
}
