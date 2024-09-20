const userService = require('../services/userService');
const userValidtion = require('../utils/userValidation');
const loginValidation = require('../utils/loginValidation');
const jwt = require('jsonwebtoken');



const jwt_secret = process.env.JWT_SECRET;

exports.registerUser = async (req , res)=>{


    try{

        const {error} = userValidtion.validate(req.body);

        if (error) throw new Error(error.details[0].message);


        const newUser = await userService.register(req.body);

        const tokken = jwt.sign({id : newUser._id , role : newUser.role} , jwt_secret , {expiresIn : '3h'});

        res.status(201).json({message:'user was registerd successfully', user: newUser , token : tokken});
    }

    catch(err){

        res.status(400).json({error : err.message});
    }
};

exports.loginUser = async (req , res)=>{


try{

const {error} = loginValidation.validate(req.body);
if(error) throw new Error(error.details[0].message);

const user = await userService.login(req.body);
    
const tokken = jwt.sign({id : user._id , role : user.role} , jwt_secret , {expiresIn : '3h'});

res.status(200).json({message:'user was login successfully', user , token : tokken});

}catch(err){    
    res.status(400).json({error : err.message});
}


}