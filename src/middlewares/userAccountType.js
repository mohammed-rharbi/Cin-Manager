




const checkSub = (req , res , next)=>{


    if(req.user.accountType === 'subscribed'){

        return next();

    }else{

        return res.status(403).json({message:"You need to be subscribed to access this content"});
    }

}

module.exports = checkSub;