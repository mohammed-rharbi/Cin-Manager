const userService = require('../services/userService');
const {loginValidation , registerValidation} = require('../utils/AuthValidation');
const jwt = require('jsonwebtoken');



const jwt_secret = process.env.JWT_SECRET;

exports.registerUser = async (req , res)=>{


    try{

        const {error} = registerValidation.validate(req.body);

        if (error) throw new Error(error.details[0].message);


        const newUser = await userService.register(req.body);

        const tokken = jwt.sign({id : newUser._id , role : newUser.role} , jwt_secret , {expiresIn : '3h'});

        res.status(201).json({message:'user was registerd successfully', user: newUser , token : tokken});
    }

    catch(err){

        res.status(400).json({error : err.message});
    }
};


exports.loginUser = (req, res) => {
    try {
        const { error } = loginValidation.validate(req.body);
        if (error) throw new Error(error.details[0].message);

        userService.login(req.body, (user) => {

                const token = jwt.sign({ id: user._id, role: user.role }, jwt_secret, { expiresIn: '3h' });

            res.status(200).json({
                message: 'User logged in successfully',
                user,
                token: token
                });
            })
            .catch(err => {
                res.status(400).json({ error: err.message });
            });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



exports.logoutUser = async (req , res)=>{

    res.status(200).json({message : 'user was logout successfully'});
}


exports.ReqresetPassword = async (req , res)=>{

    try{

        const {email} = req.body;
        const messageRes = await userService.resetPasswordRequist(email);
        res.status(200).json({ message:'request was send successfully to your email' , messageRes })


    }catch(err){

        res.status(400).json({error : err.message});
    }

}

exports.resetPassword = async (req , res)=>{

    try{
        const {resetToken} = req.params;
        const {newPassword} = req.body; 
        const message = await userService.resetPassword(resetToken , newPassword);
        res.status(200).json({message })

    }catch(err){
        res.status(400).json({error : err.message});

    }

}

exports.updateProfile = async (req , res)=>{


    try{

        const userId = req.params.id

        const {name , email , birthDay} = req.body

        const profileImage = req.file ? req.file.path : null;


        const updatedProfile = userService.profileUpdate( userId , { name , email , birthDay });
        res.status(200).json({message : 'profile was updated successfully' , updatedProfile}); 

            
    }catch(err){

        return res.status(400).json({error: err.message})
    }
}

exports.getUserInfo = async (req , res)=>{


    try{

        const userId = req.params.id

        const user = await userService.getUserById(userId);
    
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
    
        res.status(200).json({message : 'user fetched successfully' , updatUser:user })

    }catch(err){
        return res.status(400).json({Error : err.message})
    }
}