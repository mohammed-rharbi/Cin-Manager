const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');


const jwt_secret = process.env.JWT_SECRET;


exports.authMiddlware = async (req , res , next)=>{

    const token = req.header('AUTHORIZATION')?.split(' ')[1];

    if(!token) return res.status(401).json({message : 'Please login'});

    try{

        const decoded = jwt.verify(token , jwt_secret);
        req.user = decoded;
        next();

    }catch(err){

        res.status(401).json({message : 'invalid token'});
    }
};


exports.isAdmin = async (req , res , next)=>{

    try{
    const admin = await  User.findById(req.user.id);

    if(!admin  || admin.role !== 'admin') return res.status(403).json({message : 'forbidden'});

    next();
    }catch(err){
        res.status(500).json({error : err.message});
    }
};