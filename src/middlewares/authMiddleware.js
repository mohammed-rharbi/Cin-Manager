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