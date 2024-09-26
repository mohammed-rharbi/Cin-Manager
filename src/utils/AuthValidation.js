const joi = require('joi');





const registerValidation = joi.object({

    name : joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});


const loginValidation = joi.object({

    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});





module.exports = {loginValidation , registerValidation};