const adminService = require('../services/adminService');
const {registerValidation} = require('../utils/AuthValidation');  
const jwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT_SECRET;

exports.RegisterAdmin = async (req , res)=>{

    try{

        const {error} = registerValidation.validate(req.body);
        if(error) throw new Error(error.details[0].message);


        const newAdmin = await adminService.CreateAdmin(req.body);


        const tokken = jwt.sign({id : newAdmin._id , role : newAdmin.role} , jwt_secret , {expiresIn : '3h'} );

        res.status(201).json({message:'admin was registerd successfully', user: newUser , token : tokken});

    }catch(err){

        res.status(400).json({error : err.message});
    }
}