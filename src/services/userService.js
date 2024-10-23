const userRepositories = require('../repositories/userRepositories');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
// const { setMaxListeners } = require('../models/movieSchema');
const jwt_secret = process.env.JWT_SECRET;




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
exports.login = (userData, callback) => {

    const { email, password } = userData;

    return userRepositories.getUserByEmail(email)
    .then(user => {
    if (!user) throw new Error('User not found');

    return bcrypt.compare(password, user.password)
    .then(isMatch => {
     if (!isMatch) throw new Error('Invalid credentials');

    callback(user);
    });
    })
    .catch(err => {
            throw new Error('its error');
    });
};


exports.resetPasswordRequist = async (email)=>{

const user = await userRepositories.getUserByEmail(email);
if(!user) throw new Error('user not found');

const userId =  user._id;


const resetTokken = jwt.sign({id : userId} , jwt_secret , {expiresIn : '1h'});
const resLink = `http://localhost:5173/reset-password/${resetTokken}`;

const transporter = nodemailer.createTransport({

    service:'gmail',
    auth:{  
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }

});


const mailOptions = {

    from : process.env.EMAIL_USER,
    to :  email,
    subject : 'email reset',
    html : `
    <p>You requested to reset your password.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resLink}">${resLink}</a>
        <p>The link expires in 1 hour.</p>`
};

await transporter.sendMail(mailOptions);
}


exports.resetPassword = async (resetToken , newPassword)=>{


const decoded = jwt.verify(resetToken , jwt_secret);

if(!decoded){
    throw new Error('its not found')
}

const userId = decoded.id;


const user = await userRepositories.getUserById(userId);
if(!user) throw new Error('user not found');


const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(newPassword , salt)
await userRepositories.save(user);

return 'password reset successfully';
}


exports.profileUpdate = async (userId , userData)=>{

    const {name , email , birthDay } = userData;

    if(!name || !email){

        throw new Error('name and email are requird');
    }

    const updatedProfile = userRepositories.userProfileUpdate(userId , {name , email , birthDay });

    return {updatedProfile};

}

exports.getUserById = async (Id)=>{

    
    const user = await userRepositories.getUserById(Id);

    if(!user){
        throw new Error('user was not found');
    }

    return user

}
