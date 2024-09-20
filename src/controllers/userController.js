const userService = require('../services/userService');




exports.registerUser = async (req , res)=>{


    try{

        const newUser = await userService.register(req.body);
        res.status(201).json({message:'user was registerd successfully', user: newUser });
    }
    
    catch(err){

        res.status(400).json({error : err.message});
    }
};